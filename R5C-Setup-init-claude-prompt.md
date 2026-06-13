# 🧩 R5C 刷机复现套装(分段 · 依赖 · 注释版)

> 设备:ImmortalWrt FriendlyARM NanoPi R5C｜SSH 别名 `R5C`｜密钥 `~/.ssh/id_r5c`
> 刷机后 host key 会变,执行时 Claude 会自动清旧 key 重连,无需手动处理。

---

## 📋 依赖与执行顺序

```
①装包 ──┐
        ├─→ ②extroot扩容 ──→ ③sysctl/nikki ──→ ④登录魔改 ──→ ⑤纳入备份
        │     (先扩容空间才够)    (③依赖②空间)    (独立)      (依赖④的文件)
        └─ ①和②可互换，但若 loop overlay 快满，务必先②
```

| 段 | 是否必须 | 依赖 | 性质 |
|---|---|---|---|
| ① 装包 | 推荐 | 网络 | 联网 apk |
| ② extroot | 看需求 | mmcblk1p3 存在 | **高风险·人工核对** |
| ③ sysctl/nikki | 推荐 | nikki 装好(③后半) | 写配置 |
| ④ 登录魔改 | 看需求 | 无 | 改系统文件 |
| ⑤ 纳入备份 | 配套④ | ④已完成 | 写 sysupgrade.conf |

---

## ① 装回官方软件包(主题 + 中文翻译)

```
帮 R5C 装回官方软件包：先 apk update（必须成功，否则索引旧了会静默漏装），
再 apk add luci-theme-openwrt luci-i18n-base-zh-cn luci-i18n-dashboard-zh-cn
luci-i18n-eqos-zh-cn luci-i18n-homeproxy-zh-cn luci-i18n-package-manager-zh-cn
luci-i18n-statistics-zh-cn luci-i18n-ttyd-zh-cn
不要装 cpufreq。装完逐个验证已安装。
```

| 注释 | 说明 |
|---|---|
| ⚠️ `apk update` 必须先成功 | 否则索引旧 → 静默漏装(实测漏过包) |
| ❌ 不装 cpufreq | 用户明确不要 |
| 自动拉依赖 | 装 i18n 翻译会自动带对应 `luci-app-*` |

---

## ② eMMC extroot 扩容(overlay 迁到 56G)

```
帮 R5C 做 eMMC extroot 扩容，把系统 overlay 从小 loop 设备迁到 56G 的 /dev/mmcblk1p3。
步骤：
1. 先 df -h / mount / uci show fstab / block info 确认现状，报告 /overlay/upper 大小；
2. 清空 /mnt/mmcblk1p3 旧 upper/work（保留 lost+found）并重建空目录；
3. cp -a /overlay/upper/. /mnt/mmcblk1p3/upper/ 复制当前运行系统可写层，复制后对比两边大小一致；
4. 改 fstab：target='/overlay' 那条 mount 的 uuid 指向 mmcblk1p3 的 UUID（现查不写死）且 enabled='1'，
   单独挂 /mnt/mmcblk1p3 那条设 enabled='0'，uci commit fstab；
5. reboot，回来后 df -h 验证 /overlay 来源是 /dev/mmcblk1p3、可用 ~53G。
全程每步先确认再执行，复制完成、UUID 对上之前绝不改 fstab。
```

| 注释 | 说明 |
|---|---|
| 🔴 高风险 | 迁移运行中的系统,需人工核对后重启 |
| UUID 现查 | 固件重置后会变,**不写死**(这台是 `01cc6985-…`,以现查为准) |
| 先清空再复制 | mmcblk1p3 可能有旧 extroot 残留,不清会新旧混合 |
| ❌ 不能进 uci-defaults | 是一次性迁移,不是声明式配置 |

---

## ③ sysctl 网络优化 + nikki 调优

```
帮 R5C 执行优化：
1. 写入 /etc/sysctl.conf 并立即生效（写入前去重防堆叠）：
   rmem_max/wmem_max=16MB，tcp_rmem/tcp_wmem max=16MB，tcp_mtu_probing=1，
   nf_conntrack_max=131072，tcp_fastopen=3
2. 若 nikki 已安装，UCI 设置：log_level=error，清理 cron 改 */30 * * * *，
   清理阈值 5MB，commit 后重启 nikki。
执行完验证所有参数是否生效。
```

| 参数 | 值 | | nikki 字段 | 值 |
|---|---|---|---|---|
| rmem/wmem_max | 16MB | | log_level | error |
| tcp_rmem/wmem max | 16MB | | 清理 cron | `*/30 * * * *` |
| tcp_mtu_probing | 1 | | 清理阈值 | 5 MB |
| nf_conntrack_max | 131072 | | | |
| tcp_fastopen | 3 | | | |

> 注释:nikki 是第三方 feed 包,刷机后若没装回,③的后半自动跳过(脚本有 `uci -q get nikki.mixin` 守卫)。

---

## ④ LuCI 365 天免密登录(cookie + localStorage 双保险,支持所有主题)

```
帮 R5C 实现 LuCI 后台 365 天免密登录，cookie + localStorage 双保险，支持所有主题。

【架构铁律】用独立 uci 键 luci.sauth.cookie_days（默认365）控制 cookie 时长；
sessiontime 固定为 604800（7天）绝不设大——设大会让 rpcd 会话堆积、正确密码也间歇性 403。

第一层（cookie，与主题无关）：
改 /usr/share/ucode/luci/dispatcher.uc 的 Set-Cookie 行，max-age 用
(+(uci.get('luci','sauth','cookie_days') ?? 365))*86400；并设 cookie_days=365、sessiontime=604800。

第二层（localStorage，覆盖所有主题）：
把脚本注入通用 /usr/share/ucode/luci/template/sysauth.ut 和全部 themes/*/sysauth.ut
（活动主题决定渲染哪个，OpenWrt 主题会回退通用模板）。脚本逻辑：
- 模块级 autoLogging 标记，自动登录期间禁止 save 回写（防旧密码复活）；
- submit 事件 + prototype.submit 双拦截存 base64 凭据（365天过期）；
- 加载时读 localStorage 未过期则自动填充提交；
- fuser（密码错误）时清 localStorage 并“设置”lr_tried 锁死本会话防死循环。
注意：通用模板原生 <input type=submit> 提交不触发 prototype.submit，靠 submit 事件；
      bootstrap 主题 sysauth.js 程序化 form.submit() 不触发 submit 事件，靠 prototype.submit。

第三层（登录时长字段）：
改 /www/luci-static/resources/view/system/password.js，在 admin/system/admin 页加
“登录时长（天）”输入框，默认365，读写 luci.sauth.cookie_days（绝不写 sessiontime）。

每改一个模板用 curl -s http://127.0.0.1/cgi-bin/luci/admin/system/admin 验证渲染输出；
改完 rm -f /tmp/luci-indexcache*.json && /etc/init.d/uhttpd restart，再让我退出重登测试。
```

| 配置项 | 值 | 作用 |
|---|---|---|
| `luci.sauth.cookie_days` | 365 | cookie max-age = 365天 |
| `luci.sauth.sessiontime` | **604800(7天)** | 🔴 **绝不设大**,否则登录间歇崩 |
| localStorage 过期 | 365天(模板写死) | 真正的长期免密机制 |

| 致命坑 | 现象 → 根治 |
|---|---|
| sessiontime 设 31536000 | 日志记 `accepted` 但响应 403,rpcd 会话堆积 → 固定 604800 + 解耦 cookie_days |
| 改错模板 | OpenWrt 主题回退**通用模板**,不是 bootstrap → curl 抓渲染确认 |
| 旧密码回写 | 自动登录触发 save 复活旧密码 → autoLogging 守卫 |
| 浏览器缓存 | `?v=` 导致普通刷新不更新 → 隐身窗口/清缓存硬重载 |
| 应急登不进 | `/etc/init.d/rpcd restart` 清积压会话 |

---

## ⑤ 把魔改纳入备份(扛过备份/恢复)

```
帮 R5C 把 LuCI 登录魔改纳入备份：往 /etc/sysupgrade.conf 追加这 4 个路径并去重——
/usr/share/ucode/luci/dispatcher.uc
/usr/share/ucode/luci/template/sysauth.ut
/usr/share/ucode/luci/template/themes/bootstrap/sysauth.ut
/www/luci-static/resources/view/system/password.js
然后用 sysupgrade -l 验证这 4 个文件已进备份清单。
```

| 备份覆盖情况 | 文件 |
|---|---|
| ✅ 默认就在备份 | `/etc/config/*`(nikki/luci/fstab/cookie_days)、`/etc/sysctl.conf`、密码/密钥 |
| ❌ 需手动加 | 上面 4 个 `/usr/share/` 和 `/www/` 魔改文件 |

> ⚠️ 仅**恢复到相同固件版本**安全;跨版本应重跑④而非还原旧文件(LuCI 文件格式可能变)。
> ⚠️ **全盘重刷**时 extroot 的 overlay 数据需重做②的复制步骤(fstab 配置恢复但数据不在备份里)。

---

## ✅ 收尾自检清单

```
帮 R5C 做收尾自检：验证
1. sysctl 全部参数生效；
2. nikki 三项 UCI 生效（若装了）；
3. /overlay 来源是 /dev/mmcblk1p3、可用 ~53G；
4. cookie_days=365、sessiontime=604800；
5. curl 测 web 登录返回 302 且 cookie max-age≈365天；
6. sysupgrade -l 含 4 个魔改文件。
逐项报告。
```

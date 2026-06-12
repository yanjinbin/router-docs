import './style.css'

const docs = [
  {
    title: '多机场订阅组合',
    subtitle: '良心云 · 渔舍 · 赔钱 · 极风',
    desc: '四机场合并配置模板，住宅 IP 双链路出口，AI 专用分流，UDP 443 REJECT 防泄露，完整规则注释',
    href: '/yunyufen-config.html',
    tag: '配置',
    tagColor: '#3dd68c',
  },
  {
    title: '梅林固件设置指南',
    subtitle: 'AX82U & RAX80',
    desc: 'Merlin 固件完整配置教程，包含 Mihomo 代理、JFFS 脚本、WireGuard 等',
    href: '/merlin-setup-guide.html',
    tag: '指南',
    tagColor: '#4f8ef7',
  },
  {
    title: 'NanoPi R5C · 软路由指南',
    subtitle: 'TF 卡万能引导 → eMMC 稳定安装',
    desc: 'TF 卡作为万能引导系统，完成调试后写入 eMMC 保证稳定性。含 ImmortalWrt 刷入、网络配置全流程',
    href: '/nanopi_r5c_guide.html',
    tag: '教程',
    tagColor: '#3dd68c',
  },
  {
    title: '软路由终极横评 · 17 款全对比',
    subtitle: 'x86 · FriendlyELEC · HINLINK · 无线路由',
    desc: '17 款设备 5 维度一页查完：硬件参数、固件生态、网口总线 & PCIe、加解密 & 性能、综合评分。含 N100/N150/R2S~R76S/H28K~H69K/M68S/RAX80/AX82U',
    href: '/softrouter-mega-comparison.html',
    tag: '横评',
    tagColor: '#f5a623',
  },
  {
    title: '苹果礼品卡购买指南',
    subtitle: '土耳其区 · 尼日利亚区',
    desc: '低价区 App Store 礼品卡购买渠道，土耳其区推荐 SEAGM.com，含全球 AI 订阅价格对比工具',
    href: '/apple-giftcard-guide.html',
    tag: '指南',
    tagColor: '#f5a623',
  },
  {
    title: 'eSIM 实体卡选购指南',
    subtitle: 'BeeSIM · eSTK · 9eSIM · xeSIM',
    desc: 'ECP / Kigen / G+D 三档芯片方案详解，兼容性差异根源、产品横向对比，按预算和场景一步到位选卡',
    href: '/esim-card-guide.html',
    tag: '指南',
    tagColor: '#4f8ef7',
  },
  {
    title: 'Nikki DNS 分流配置',
    subtitle: 'ImmortalWrt R5C · 25.12.0 · fake-ip 两种策略',
    desc: '两套 Mihomo/Nikki 透明代理 DNS 分流配置对比：方案一保留境外兜底（geosite:gfw），方案二纯国内兜底（geosite:gfw,tld-!cn），含完整 fake-ip-filter / sniffer / TUN 配置',
    href: '/nikki-dns-split.html',
    tag: '配置',
    tagColor: '#3dd68c',
  },
  {
    title: 'OpenWrt 代理插件横评',
    subtitle: 'Nikki · OpenClash · HomeProxy · PassWall…',
    desc: '11 款 OpenWrt 代理插件全横评：Nikki vs OpenClash 深度对比，sing-box / Mihomo / Xray 三大阵营逐一详解，按场景选型建议',
    href: '/openwrt-proxy-plugins.html',
    tag: '对比',
    tagColor: '#c084fc',
  },
]

document.querySelector('#app').innerHTML = `
<header>
  <div class="header-inner">
    <div class="brand">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
      友善 R5C ARM软路由 & 华硕梅林固件指南
    </div>
    <span class="status-badge">
      <span class="dot"></span>AX82U 稳定运行中
    </span>
  </div>
</header>

<main>
  <div class="hero">
    <h1>友善 R5C ARM软路由 & 华硕梅林固件指南</h1>
    <p>NanoPi R5C · 华硕 AX82U / RAX80 · ImmortalWrt · 梅林固件 · 设备选型</p>
  </div>

  <div class="grid">
    ${docs.map(d => `
      <a class="card" href="${d.href}">
        <div class="card-top">
          <span class="tag" style="--tag-color:${d.tagColor}">${d.tag}</span>
        </div>
        <h2>${d.title}</h2>
        <p class="subtitle">${d.subtitle}</p>
        <p class="desc">${d.desc}</p>
        <span class="read-more">阅读全文 →</span>
      </a>
    `).join('')}
  </div>

  <footer>
    <p>AX82U · Firmware 3004.388.10_2 · Mihomo v1.19.24 · 持续稳定运行</p>
  </footer>
</main>
`

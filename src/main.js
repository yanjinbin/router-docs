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
    title: 'ARM 软路由横向对比',
    subtitle: '全平台综合评测',
    desc: '多款主流 ARM 软路由设备性能、价格、功耗完整横向对比',
    href: '/arm_softrouter_full_comparison.html',
    tag: '对比',
    tagColor: '#f5a623',
  },
  {
    title: 'Hinlink 系列 vs NanoPi R4S',
    subtitle: '重点机型深度对比',
    desc: 'H68K、H88K 等 Hinlink 系列与 NanoPi R4S 详细规格与场景对比',
    href: '/hinlink_series_vs_r4s_comparison.html',
    tag: '对比',
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
    title: 'OpenWrt 代理插件横评',
    subtitle: 'Nikki · OpenClash · HomeProxy · PassWall…',
    desc: '11 款 OpenWrt 代理插件全横评：Nikki vs OpenClash 深度对比，sing-box / Mihomo / Xray 三大阵营逐一详解，按场景选型建议',
    href: '/openwrt-proxy-plugins.html',
    tag: '对比',
    tagColor: '#c084fc',
  },
  {
    title: '软路由八强对决',
    subtitle: '旗舰机型全面评测',
    desc: '8 款主流软路由设备综合实测，覆盖性能、稳定性、散热、性价比维度',
    href: '/softrouter_full_8way_comparison.html',
    tag: '对比',
    tagColor: '#f5a623',
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
      友善 R5C 软路由 & 华硕梅林固件指南
    </div>
    <span class="status-badge">
      <span class="dot"></span>AX82U 稳定运行中
    </span>
  </div>
</header>

<main>
  <div class="hero">
    <h1>友善 R5C 软路由 & 华硕梅林固件指南</h1>
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

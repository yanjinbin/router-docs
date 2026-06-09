import './style.css'

const docs = [
  {
    title: '云雨分 · Mihomo 配置模板',
    subtitle: '四机场合并 · 住宅 IP 双链路',
    desc: '渔舍 + 良心云 + 赔钱 + 极风合并配置，AI 专用分流，UDP 443 REJECT 防泄露，完整规则注释',
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
    title: 'NanoPi R5C 刷机教程',
    subtitle: 'ImmortalWrt 完整流程',
    desc: '从刷入 ImmortalWrt 到配置软路由的完整步骤，含 TF 卡启动与 eMMC 写入',
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
      软路由 & 固件指南
    </div>
    <span class="status-badge">
      <span class="dot"></span>AX82U 稳定运行中
    </span>
  </div>
</header>

<main>
  <div class="hero">
    <h1>软路由配置文档中心</h1>
    <p>梅林固件 · OpenWrt · ImmortalWrt · 设备选型指南</p>
  </div>

  <div class="grid">
    ${docs.map(d => `
      <a class="card" href="${d.href}" target="_blank">
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

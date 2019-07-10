## 离线字体包

`soulTable` 默认使用在线字体包。考虑到可能有无网环境使用，在此文件夹内提供离线字体包

## 使用离线字体包

将离线字体包拷贝到自己的项目中，然后修改 `soulTable.css` , url中的位置改为实际位置

```css
@font-face {
    font-family: 'soul-icon';  /* project id 677836 */
    src: url('font/iconfont.eot');
    src: url('font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('font/iconfont.woff2') format('woff2'),
    url('font/iconfont.woff') format('woff'),
    url('font/iconfont.ttf') format('truetype'),
    url('font/iconfont.svg#iconfont') format('svg');
}
```


fetch('https://my.spline.design/nexbotrobotcharacterconcept-xyNTs5TJVgpzAqceEsdisQ7S/')
  .then(res => res.text())
  .then(html => {
    require('fs').writeFileSync('D:\\WEB-D\\Portfolio\\scratch\\spline.html', html);
  })
  .catch(console.error);

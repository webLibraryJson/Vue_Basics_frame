//文件导出 
//name 文件名称
//Blob数据
export function downloadFile(obj, name) {
    const url = window.URL.createObjectURL(new Blob([obj]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    const fileName = name
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

//文件导出，直接去取静态文件
export function downloadFileStatic(url,fileName){
  const link = document.createElement('a')
  link.style.display = 'none'
  // link.setAttribute('download', fileName)
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

//数字千分隔
export function thousandSeparator(num) {
    return num && (num
      .toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2) {
        return $2 + ",";
      }) : num.toString().replace(/(\d)(?=(\d{3})+\b)/g, function($1, $2) {
        return $2 + ",";
      }));
  }
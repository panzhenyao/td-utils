/**
 * @description 文件流下载(需要对请求配置  axios-> config responseType: 'blob'; fetch-> then(res=> new Blob) )
 * @param {Blob} data 流数据
 * @param {String} fileName 文件名
 * @param {String} filType 文件名后缀
 * @param {String} mimeType 文件 mime-types https://www.iana.org/assignments/media-types/media-types.xhtml#application
 */
function downloadFile(data, fileName, filType, mimeType) {
	if (!data || !window || !document) {
		throw new Error('method downloadFile not supported ')
	}
	var isIE = !!window.ActiveXObject || 'ActiveXObject' in window
	var MimeType = mimeType || filType
	if (isIE) {
		// ie下载
		var blob = new Blob([data], {
			type: 'application/'+ MimeType +';charset=utf-8;',
		})
		window.navigator.msSaveBlob(blob, fileName + '.' + filType)
	} else {
		// 非ie下载
		var URL = window.URL || window.webkitURL || window.moxURL
		var url = URL.createObjectURL(
			new Blob([data], {
				type: 'application/' + MimeType,
			})
		)
		var link = document.createElement('a')
		link.style.display = 'none'
		link.href = url
		link.setAttribute('download', fileName + '.' + filType)
		document.body.appendChild(link)
		link.click()
		URL.revokeObjectURL(link.href)
		document.body.removeChild(link)
	}
}

module.exports = downloadFile

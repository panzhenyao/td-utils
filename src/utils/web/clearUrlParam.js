/**
 * @description 清空url 参数
 */
function clearUrlParam() {
	if (!window) return
	var url = window.location.href
	if (url.indexOf('?') != -1) {
		url = url.replace(/(\?)[^'"]*/, '')
		window.history.pushState({}, 0, url)
	}
}

module.exports = clearUrlParam
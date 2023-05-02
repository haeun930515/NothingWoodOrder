
export default function calculate(width, height) {
    const basicHeight = 2400
	if ((width && height) == false) {
		return "가로 세로를 입력해주세요"
	}
	let threeNum = 0
	let sixNum = 0

	let count = parseInt(basicHeight / height)

	if (count == 0) {
		count = 1
	}

	if (width > (300 * count)) {
		threeNum = Math.ceil( ( width * Math.ceil( height / 2400 ) / ( 300 * count ) ) )
	} else {
		threeNum = Math.ceil(Math.ceil(Math.ceil( height / 2400 ) / ( parseInt((300 * count) / width) )))
	}

	if (threeNum > 1) {
		sixNum = parseInt(threeNum / 2)
		threeNum = threeNum % 2
	}

	return "300: " + threeNum + "개, 600: " + sixNum + "개"
}

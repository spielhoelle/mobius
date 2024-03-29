const useLS = false
const videos = [...document.querySelectorAll('.overlay')]
const categories = [...document.querySelectorAll('.category_selector')]
const container = document.querySelector('.wp-block-create-block-tmy-mediacategories.categories .videos')
let playing = 0
const siteBlocks = document.body
const alreadyPlayed = localStorage.getItem('mobius_sequence')
const alreadyPlayedTimeStamp = useLS ? Number(alreadyPlayed) : Date.now() - 80000
if (container) {
	categories.map((category, index) => {
		category.addEventListener('click', function (e) {
			e.preventDefault()
			videos.forEach((video, i) => {
				const videoCats = JSON.parse(video.dataset.seqcatid)
				console.log('videoCats', videoCats)
				if (!videoCats.includes(Number(e.target.dataset.catid))){
					video.classList.add('hidden')
					video.pause()
				} else {
					video.classList.remove('hidden')
					video.play()
				}
			})
		})
	})
	container.addEventListener('click', function (e) {
		siteBlocks.classList.remove('loading')
		if (videos[playing]) {
			if (e.metaKey && e.shiftKey) {
				container.classList.add('hidden')
			} else if (e.shiftKey) {
				container.classList.toggle('active')
			} else {
				videos[playing].pause()
				if (videos[playing + 1]) {
					videos[playing + 1].classList.remove('hidden')
					videos[playing + 1].play()
				}
			}
			if (useLS) {
				localStorage.setItem('mobius_sequence', Date.now())
			}
		}
	})
}
if (videos[0]) {
	if (!alreadyPlayedTimeStamp || alreadyPlayedTimeStamp + 60000 < Date.now()) {
		videos[0].onloadeddata = function () {
			videos.map((video, index) => {
				siteBlocks.classList.remove('loading')
				if (videos[index]) {
					videos[index].addEventListener("pause", function () {
						playing = (playing + 1) % videos.length
						videos[index].pause()
						videos[index].classList.add('hidden')
						if (videos[(index + 1) % videos.length]) {
							console.log(`Video ${index} paused, play next`)
							videos[(index + 1) % videos.length].classList.remove('hidden')
							videos[(index + 1) % videos.length].play()
						}
					})
				}
			})
		}
	} else {
		siteBlocks.classList.remove('loading')
		videos[0].classList.add('hidden')
		container.classList.add('hidden')
	}
}
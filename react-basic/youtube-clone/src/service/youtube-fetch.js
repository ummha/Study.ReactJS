class YoutubeFetch {
	/**
	 *  Axios library 추가 [$yarn add axios]
	 *  fetch() 대용으로 사용할 수 있는 라이브러리
	 */
	constructor(key) {
		this.key = key;

		this.getRequestOptions = {
			method: 'GET',
			redirect: 'follow',
		};
	}

	async mostPopular() {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
			this.getRequestOptions
		);
		const result_1 = await response.json();
		return result_1.items;
	}

	async search(query) {
		return fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=${query}&key=${this.key}`,
			this.getRequestOptions
		)
			.then((response) => response.json())
			.then((result) =>
				result.items.map((item) => ({ ...item, id: item.id.videoId }))
			);
	}
}

export default YoutubeFetch;

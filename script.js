function teamSetup() {
	// Store
	window.store = new Vuex.Store({
		state: {
			testimonials: [],
		},
		mutations: {
			updateData(state, payload) {
				for (param in payload) {
					state[param] = payload[param]
				}
			}
		}
	})
	
	var _airTable = new airTable(apiKey='keyLu9ztyvGwQEfCw', appKey='appPrctGxRtmKRWdG')

	Vue.http.get(_airTable.ListEndpoint('Témoignages')).then((response) => {
		var testimonials = _airTable.Clean(response.body.records)
		store.commit('updateData', {'testimonials': testimonials})
	})
	
	// Components

	var testimonial = {
		props: ['testimonial'],
		template: `
			<div class="col-sm-4 team-member">
				<div class="row">
					<div class="col-3">
						<div class="portrait" v-bind:style="{ backgroundImage: 'url(' + testimonial.Photo[0].thumbnails.large.url + ')' }"></div>
					</div>
					<div class="col-9 testimonial-header">
						<h5 class="testimonial-name">{{ testimonial['Témoin'] }}</h5>
						<p class="testimonial-title">{{ testimonial['Titre'] }}</p>
					</div>
				</div>
				<p class="small testimonial-text">“{{ testimonial['Texte'] }}”</p>
			</div>
		`
	}
	
	// App
	var app = new Vue({
		el: '#team',
		store,
		components: { testimonial },
		template: `
			<div id="team" class="col-12 col-lg-10 mr-auto ml-auto">

				<div class="row team-wrapper">

					<testimonial
						v-for="testimonial in store.state.testimonials"
						:testimonial="testimonial"
						></testimonial>

				</div>
			</div>
		`
	})
}



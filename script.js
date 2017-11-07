function teamSetup() {
	// Store
	window.store = new Vuex.Store({
		state: {
			members: [],
		},
		mutations: {
			updateData(state, payload) {
				for (param in payload) {
					state[param] = payload[param]
				}
			}
		}
	})
	
	var _airTable = new airTable(apiKey='keyQ9LAVuNmhIIhjN', appKey='appHznRjE909j9VlP')

	Vue.http.get(_airTable.ListEndpoint('Membres')).then((response) => {
		var members = _airTable.Clean(response.body.records)
		store.commit('updateData', {'members': members})
	})
	
	// Components

	var Member = {
		props: ['member'],
		template: `
			<div class="col-sm-3 team-member">
				<img alt="image" class="img-fluid" src="./img/img_round.svg">
				<h5><strong>Sara Doe</strong></h3>
				<p class="small text-muted">"Wild Question Marks, but the Little Blind"</p>
			</div>
		`
	}
	
	// App
	var app = new Vue({
		el: '#team',
		store,
		components: { Member },
		template: `
			<div class="col-10" id="team">

				<div class="row">

					<member
						v-for="member in store.state.members"
						:member="member"
						></member>

            	</div>
			</div>
		`
	})
}
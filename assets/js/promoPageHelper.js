(function (window, document) {
	const VB_HOST = 'www.virginbet.com';

	const isBtagExpired = (expiresAt) => (!expiresAt || Date.now() > expiresAt);

	function segmentInit(){
		const brandKeys = {
			"ie": "eu3KwnYxmA2wLLxGn8TB6YYJy0jbaXb6",
			"ng": "KOIuNwmIexWk5NSknOoYdn0D202rhkGF",
			"bg": "t31E8zMINb1MwXVzZDVMLa9aQB3FwMlS",
			"uk": "eu3KwnYxmA2wLLxGn8TB6YYJy0jbaXb6",
			"vb": "1jvRDG9l7ggPdaOnO5lALZb6n29lvwMB"
		}

		const brand = location.pathname.split('/')[1];

		var segmentKey;

		if(location.host === VB_HOST){
			segmentKey = brandKeys.vb;
		} else {
			segmentKey =  brandKeys[brand];
		}

		function traitsMiddleware(props) {
			var payload = props.payload;
			if (localStorage.getItem('ajs_user_traits')) {
				var traits = JSON.parse(localStorage.getItem('ajs_user_traits'));
				if (traits) {
					Object.keys(traits).forEach(function (key) {
						if (!traits[key]) {
							delete traits[key];
						}
					});

					payload.obj.context = Object.assign({}, payload.obj.context, { traits: traits });
				}
			}
			props.next(payload);
		}

		var analytics = window.analytics = window.analytics || []; if (!analytics.initialize) if (analytics.invoked) window.console
			&& console.error && console.error("Segment snippet included twice."); else {
			analytics.invoked = !0; analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview",
				"identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on", "addSourceMiddleware",
				"addIntegrationMiddleware", "setAnonymousId", "addDestinationMiddleware"];
			analytics.factory = function (e) {
				return function () {
					var t = Array.prototype.slice.call(arguments);
					t.unshift(e); analytics.push(t); return analytics
				}
			};
			for (var e = 0; e < analytics.methods.length; e++) { var key = analytics.methods[e]; analytics[key] = analytics.factory(key) } analytics.load = function (key, e) {
				var t = document.createElement("script"); t.type = "text/javascript"; t.async = !0;
				t.src = "https://cdn.segment.com/analytics.js/v1/" + segmentKey + "/analytics.min.js";
				var n = document.getElementsByTagName("script")[0]; n.parentNode.insertBefore(t, n); analytics._loadOptions = e
			};
			analytics._writeKey = segmentKey;
			analytics.SNIPPET_VERSION = "4.15.3";
			analytics.addSourceMiddleware(traitsMiddleware);
			analytics.load(segmentKey);

			let btagValue = null;
			const qParams = new URLSearchParams(location.search);
			const lsm_aid = qParams.get('lsm_aid');
			btagValue = qParams.get('btag');

			const analyticsReadyCallback = () => {
				const trackParams = { name: "landing_page" };

				if(!btagValue){
					const registration = JSON.parse(localStorage.getItem("registration")) || {};
					if (registration.btag && registration.btag.value && !isBtagExpired(registration.btag.expiresAt)) {
						btagValue = registration.btag.value;
					}
				}

				if (lsm_aid) {
					window.analytics.setAnonymousId(lsm_aid);
					window.analytics.identify({ lsm_click_id: qParams.get('lsm_click_id') || '', campaign: btagValue}, {anonymousId: lsm_aid });
				} else {
					window.analytics.identify({ lsm_click_id: qParams.get('lsm_click_id') || '', campaign: btagValue });
				}

				if (btagValue) {
					trackParams.value = btagValue;
				}
				window.analytics.track('Screen', trackParams);
			}

			analytics.ready(analyticsReadyCallback);
		}
	}

	function updateUrl() {
		const qParams = new URLSearchParams(location.search);
		const registration = JSON.parse(localStorage.getItem("registration")) || {};
	
		function setBTagToLocalStorage(value, daysToExpire) {
			const expiration = Date.now() + daysToExpire * 24 * 60 * 60 * 1000;
	
			const registrationBtag = {
				...(registration.btag || {}),
				value: value,
				expiresAt: expiration
			};
	
			const registrationData = {
				...registration,
				btag: registrationBtag
			};
	
			localStorage.setItem("registration", JSON.stringify(registrationData));
		}
	
		if (qParams.has("btag")) {
			const btagValue = qParams.get("btag");
			qParams.delete("btag");
	
			let updatedPathname = location.pathname;
			if (qParams.toString()) {
				updatedPathname += "?" + qParams.toString();
			}
	
			window.history.replaceState({}, document.title, updatedPathname);
	
			setBTagToLocalStorage(btagValue, 1);
		} else {
			const btExists = registration.btag && !isBtagExpired(registration.btag.expiresAt);
	
			if (document.referrer && !document.referrer.includes('btag') && !btExists) {
				setBTagToLocalStorage("s_", 1);
			}
		}
	}

	function updateLinks() {
		const newParams = location.search;
		const listItems = window.document.getElementsByTagName('a');
		let btagValue = null;

		const registration = JSON.parse(localStorage.getItem("registration")) || {};
		if (registration.btag && registration.btag.value && !isBtagExpired(registration.btag.expiresAt)) {
			btagValue = registration.btag.value;
		}
		let eventData = {
			screen: 'landing_page',
			feature: 'cta',
			action: 'open',
			gesture: 'tap'
		};

		if (btagValue) {
			eventData = { ...eventData, value: btagValue };
		}

		for (let i = 0; i < listItems.length; i++) {
			const linkHref = listItems[i].href;

			const directLinkPosition = linkHref.toLowerCase().indexOf('/register');
			const directLink = directLinkPosition > -1;

			const deepLink = linkHref.toLowerCase().indexOf('/dl/') > -1;
			const onelinkLink = linkHref.toLowerCase().indexOf('.onelink.me') > -1;
			const originSearch = listItems[i].search;
			const originPathname = listItems[i].pathname;

			const shouldUpdate = (originSearch && newParams.length > 0) ? originSearch.toLowerCase().indexOf(newParams.toLowerCase().substring(1)) < 0 : true;

			if ((directLink || deepLink) && shouldUpdate && !onelinkLink) {
				if (deepLink) {
					if (originSearch) {
						listItems[i].href = linkHref + '&' + newParams.substring(1);
					} else {
						listItems[i].href = linkHref + newParams;
					}
				} else if (directLink) {
					if (originPathname.toLocaleLowerCase().indexOf('/register') > -1) {
						const host = linkHref.substring(0, directLinkPosition) + '/dl/registration';

						const updatedQp = originSearch ? (originSearch + '&' + newParams.substring(1)) : newParams;

						listItems[i].href = host + updatedQp;
					}
				}
				listItems[i].addEventListener('click', function () { return window.analytics && window.analytics.track('Tap Event', eventData); });
			}

			if (onelinkLink && originSearch) {
				const oLink = new URLSearchParams(listItems[i].search);

				let af_dp = oLink.get('af_dp');
				let af_web_dp = oLink.get('af_web_dp');

				const shouldUpdateAfDp = af_dp ? af_dp.toLowerCase().indexOf(newParams.toLowerCase().substring(1)) < 0 : false;
				const shouldUpdateAfWebDp = af_web_dp ? af_web_dp.toLowerCase().indexOf(newParams.toLowerCase().substring(1)) < 0 : false;

				af_dp = shouldUpdateAfDp && (af_dp + (af_dp.indexOf('?') > -1 ? '&' : '?') + newParams.substring(1));
				af_web_dp = shouldUpdateAfWebDp && (af_web_dp + (af_web_dp.indexOf('?') > -1 ? '&' : '?') + newParams.substring(1));

				if (af_dp) {
					oLink.set('af_dp', af_dp);
				}
				if (af_web_dp) {
					oLink.set('af_web_dp', af_web_dp);
				}

				listItems[i].href = (listItems[i].origin + listItems[i].pathname + '?' + oLink.toString());
				listItems[i].addEventListener('click', function () { return window.analytics && window.analytics.track('Tap Event', eventData); });
			}
		}
	}

	segmentInit();

	window.addEventListener('DOMContentLoaded', function () {
		setTimeout(function () {
			updateLinks();
		}, 1000);
		updateUrl();
	});
})(window, document);


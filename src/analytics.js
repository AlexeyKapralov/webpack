import * as $ from "jquery"

function createAnalytics(){
	let counter = 0;
	let isDestroy = false;

	const listener = () => counter++;
	
	$(document).on('click', listener);

	return {
		destroy(){
			$(document).off('click', listener);
			isDestroy = true;
		},
		getClicks(){
			if (isDestroy) {
				return `Analytics is destroyed. Total is: ${counter}`
			}
			return counter;
		}

	}
}

window.analytics = createAnalytics();


var TimelineUI = function() {
	this.data = data;

	var currentDate = new Date();
	this.currentYear = currentDate.getFullYear();
	this.scale = document.getElementById('timeline_sc');
	this.scaleMargin = 5;
	this.exp = document.getElementById('timeline_exp');
	this.exp_tip = document.getElementById('timeline_exp_tip');
	this.edu = document.getElementById('timeline_edu');
	this.edu_tip = document.getElementById('timeline_edu_tip');

	years = [];
	this.data.experience.forEach(function(exp) {
		years.push(exp.from.year);
	});
	this.data.education.academic.forEach(function(edu) {
		years.push(edu.from.year);
	});

	years.sort();
	this.fromYear = years[0];
	this.toYear = this.currentYear + 1;

	this.getMonthWidth = function() {
		var years = this.toYear - this.fromYear + 1
		return (100 - 2 * this.scaleMargin) / 12 / (years - 1);
	};

	this.drawScale = function() {
		var years = this.toYear - this.fromYear + 1;

		var divWidth = this.getMonthWidth(years) * 12;

		for (var i = 0; i < years; ++i) {
			div = document.createElement('div');
			div.className = 'division';
			var left = this.scaleMargin + i * divWidth;
			
			if (i % 2 == 1) {
				var left = 'calc(' + (this.scaleMargin + i * divWidth) + '% - 1px)';
				var width = divWidth + '%';
			} else {
				var left = (this.scaleMargin + i * divWidth) + '%';
				var width = 'calc(' + divWidth + '% - 2px)';
			}

			div.style.width = width;
			div.style.left = left;

			if (i == years - 1) {
				div.style.border = 'none';
				div.style.top = '0px';
			}

			year = document.createElement('div');
			year.className = 'year';
			year.style.width = (100 * this.scaleMargin / divWidth - 2) + '%';
			year.style.left = '-' + ((100 * this.scaleMargin) / (2 * divWidth)) + '%';
			year.innerHTML = this.fromYear + i + '';

			div.appendChild(year);
			this.scale.appendChild(div);
		}
	}

	this.getLength = function(item) {
		var today = new Date();

		if (item.to == undefined) {
			var toYear = today.getFullYear();
			var toMonth = today.getMonth() + 1;
		} else {
			var toYear = item.to.year;
			var toMonth = item.to.month;
		}
		return (toYear - item.from.year) * 12 - item.from.month + toMonth;
	};

	this.getStart = function(item) {
		return (item.from.year - this.fromYear) * 12 + item.from.month - 1;
	}

	this.drawEducation = function() {
		var self = this;
		this.data.education.academic.forEach(function(edu, i) {
			self.drawEducationItem(edu, i);
		});
	};

	this.drawEducationItem = function(edu, i) {
		div = document.createElement('div');
		div.className = 'item';
		var width = this.getMonthWidth() * this.getLength(edu);
		var left = this.scaleMargin + this.getStart(edu) * this.getMonthWidth();
		var itemsLength = this.data.education.academic.length;
		div.style.left = left + '%';

		if (i % 2 == 1) {
			left = 'calc(' + left + '% - 1px + 1px)';
			width = 'calc(' + width + '%)';
		} else {
			left = 'calc(' + left + '%)';
			width = 'calc(' + width + '% - 2px)';
		}

		div.style.left = left;
		div.style.width = width;

		degreeDiv = document.createElement('div');
		degreeDiv.className = 'degree';
		degreeDiv.innerHTML = edu.degreeShort;

		univLink = document.createElement('a');
		univLink.href = edu.url;
		univLink.target = '_blank';
		univLink.innerHTML = edu.university;

		univDiv = document.createElement('div');
		univDiv.className = 'univ';

		univDiv.appendChild(univLink);
		div.appendChild(degreeDiv);
		div.appendChild(univDiv);

		div.onmouseover = function (e) {
			self.edu_tip.innerHTML = edu.description;
		}

		this.edu.insertBefore(div, this.edu.firstChild);
	};

	this.drawExperience = function() {
		var self = this;
		this.data.experience.forEach(function(exp, i) {
			self.drawExperienceItem(exp, i);
		});
	};

	this.drawExperienceItem = function(exp, i) {
		div = document.createElement('div');
		div.className = 'item';
		var width = this.getMonthWidth() * this.getLength(exp);
		var left = this.scaleMargin + this.getStart(exp) * this.getMonthWidth();
		var itemsLength = this.data.experience.length;
		div.style.left = left + '%';

		if (i % 2 == 1) {
			left = 'calc(' + left + '% - 1px + 1px)';
			width = 'calc(' + width + '%)';
		} else {
			left = 'calc(' + left + '%)';
			width = 'calc(' + width + '% - 1px)';
		}

		div.style.left = left;
		div.style.width = width;

		companyDiv = document.createElement('div');
		companyDiv.className = 'company';

		companyLink = document.createElement('a');
		companyLink.href = exp.url;
		companyLink.target = '_blank';
		companyLink.innerHTML = exp.company;

		techDiv = document.createElement('div');
		techDiv.className = 'tech';
		techDiv.innerHTML = exp.tech;

		companyDiv.appendChild(companyLink);

		var css = '.timeline .experience .item:hover ~ .timeline .tip {visibility: visible; opacity: 1; transition: visibility 0s linear 0s, opacity 300ms;}';
		var style = document.createElement('style');

		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		document.getElementsByTagName('head')[0].appendChild(style);
		div.appendChild(techDiv)
		div.appendChild(companyDiv);

		var self = this;

		div.onmouseover = function (e) {
			self.exp_tip.innerHTML = exp.description;
		}

		this.exp.insertBefore(div, this.exp.firstChild);
	};

	this.render = function() {
		this.drawScale();
		this.drawEducation();
		this.drawExperience();
	};
};


var render = function() {
	var timeline = new TimelineUI();
	timeline.render();
}

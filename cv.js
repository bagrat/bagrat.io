
var ResumeUI = function (data) {
	this.data = data;
	this.root = document.getElementById('root');
	this.contacts = document.getElementById('contacts');
	this.education = {}
	this.education.academic = document.getElementById('academic');
	this.education.online = document.getElementById('online');
	this.experience = document.getElementById('experience');

	this.makeElement = function (tag, klass, content) {
		var element = document.createElement(tag);
		element.className = klass;
		element.innerHTML = content;

		return element;
	}

	this.renderContacts = function () {
		var address = this.makeElement(
			'span',
			'contact',
			this.data.contacts.address
		);

		this.contacts.appendChild(address)
	};

	this.makeAcademicElement = function (data) {
		var degree = this.makeElement(
			'span',
			'degree',
			data.degree
		);
		var area = this.makeElement(
			'span',
			'area',
			data.area
		);
		var university = this.makeElement(
			'span',
			'university',
			data.university
		);
		var range = this.makeElement(
			'span',
			'range',
			data.from.year
		);

		var element = this.makeElement(
			'div',
			'item',
			''
		);

		element.appendChild(degree);
		element.appendChild(area);
		element.appendChild(university);
		element.appendChild(range);

		return element;
	};

	this.makeOnlineElement = function (data) {
		var name = this.makeElement(
			'span',
			'name',
			data.name
		);
		var provider = this.makeElement(
			'span',
			'provider',
			data.provider
		);
		var url = this.makeElement(
			'span',
			'url',
			data.url
		);
		var year = this.makeElement(
			'span',
			'year',
			data.year
		);
		var month = this.makeElement(
			'span',
			'month',
			data.month
		);

		var element = this.makeElement(
			'div',
			'item',
			''
		);

		element.appendChild(name);
		element.appendChild(provider);
		element.appendChild(year);

		return element;
	};

	this.renderEducation = function (data) {
		var self = this;
		this.data.education.academic.forEach(function (item) {
			self.education.academic.appendChild(
				self.makeAcademicElement(item)
			);
		});
		this.data.education.online.forEach(function (item) {
			self.education.online.appendChild(
				self.makeOnlineElement(item)
			);
		});
	};

	this.makeExperienceElement = function (data) {

	};

	this.renderExperience = function (data) {

	};

	this.render = function () {
		this.renderContacts();
		this.renderEducation();
		// this.root.style.display = "block";
	};
}

function renderResume() {
	$.getJSON("../data.json").done(function (data) {
		var resume = new ResumeUI(data);
		resume.render();
	});
}

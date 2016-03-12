app = {
	config : {
		splash : '#splash',
		loginPage : '#login',
		signupPage : '#signup',
		forgotPage : '#forgot',
		homePage : '#homePage',
		dashboard : '#dashboard',
		jobsPage : '#jobsList',
		singlejobsDetail : '#jobsDetail',
		profile : '#profile',
		baseURL : 'http://babysitterconnection.com/api/public/',
		//baseURL : 'http://localhost/pkg/public/',
	},
	setupSplash : function () {
		clientHeight = $(window).height();
		clientWidth = $(window).width();
	},
	navigateSplash : function () {
		
		var Storage = app.getCookie('refractivLog');
		if (typeof(Storage) !== "undefined" && !(Storage)) {
			setTimeout(function () {
				$.mobile.navigate(app.config.loginPage);
			}, 2000);
		}
		if (typeof(Storage) !== "undefined" && Storage) {
			setTimeout(function () {
				$.mobile.navigate(app.config.jobsPage);
			}, 2000);
		}
	},
	ifLogin : function (home) {
		$('#pagetitle').text('Home');
		var timeout = 2000;
		var Storage = app.getCookie('refractivLog');
		if (home == '1') {
			timeout = 0;
		}
		if (typeof(Storage) !== "undefined" && !(Storage)) {
			setTimeout(function () {
				$.mobile.navigate(app.config.loginPage);
			}, timeout);
		}
		if (typeof(Storage) !== "undefined" && Storage) {
			setTimeout(function () {
				$.mobile.navigate(app.config.jobsPage);
			}, timeout);
		}
	},
	pageNav : function () {
		page = $.mobile.path.get();
		if (page != 'homePage' && page != 'login' && page != '' && page != 'signup' && page != 'profile') {
			var Storage = app.getCookie('refractivLog');
			if (typeof(Storage) !== "undefined" && !(Storage)) {
				$.mobile.navigate(app.config.loginPage);
			}
		}
	},
	removeCookie: function(cookieName){
		
		document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	},
	setCookie : function (cookieName, cookieValue, nDays) {
		var today = new Date();
		var expire = new Date();
		expire.setTime(today.getTime() + 3600000 * 24 * nDays);
		document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString();
	},
	getCookie : function (cookieName) {
		var theCookie = " " + document.cookie;
		var ind = theCookie.indexOf(" " + cookieName + "=");
		if (ind == -1)
			ind = theCookie.indexOf(";" + cookieName + "=");
		if (ind == -1 || cookieName == "")
			return "";
		var ind1 = theCookie.indexOf(";", ind + 1);
		if (ind1 == -1)
			ind1 = theCookie.length;
		return unescape(theCookie.substring(ind + cookieName.length + 2, ind1));
	},
	signupAuthentication : function () {
		
		my_image = $(app.config.signupPage).find('#imageVal').val();
		if(! my_image  ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Please Select your profile image.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_name = $(app.config.signupPage).find('#name').val();
		if(! my_name ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Name could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_family_sitter_name = $(app.config.signupPage).find('#familyname').val();
		if(! my_family_sitter_name ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Family name could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_email = $(app.config.signupPage).find('#email').val();
		if(! my_email ){$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Email could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		
		my_password = $(app.config.signupPage).find('#psd').val();
		if(! my_password ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Password could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_password_c = $(app.config.signupPage).find('#cfm_psd').val();
		if(! my_password_c ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Conform Password could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		if(my_password != my_password_c){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Your passwords are not same.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_date_of_birth= $(app.config.signupPage).find('#date-1').val();
		if(! my_date_of_birth ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Date of Birth could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_gender = $(app.config.signupPage).find('input:radio[name=radio-group-1]:checked').val();
		if(! my_gender ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Please Select Your Gender.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_type = $(app.config.signupPage).find('input:radio[name=radio-group-2]:checked').val();
		if(! my_type ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Please Select Type .");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
					
		$.mobile.loading("show", {
			text : "",
			textVisible : false,
			theme : "b",
			html : ""
		});
		
		$('.ui-panel-dismiss').show();
		$.ajax({
			type : 'POST',
			url : app.config.baseURL + 'users',
			xhrFields : {
				withCredentials : true
			}, 
			statusCode : {
				401 : function (response) {
					$.mobile.navigate(app.config.signupPage);
					var data = JSON.parse(response.responseText);
					app.config.authdata = data.Message;
					$.mobile.loading("hide");
					$('.ui-panel-dismiss').hide();
					$(app.config.signupPage).find('.anErrorOccure').html("");
					$(app.config.signupPage).find('.anErrorOccure').show();
					$(app.config.signupPage).find('.anErrorOccure').html(data.Message);
					app.removeCookie('refractivLog');

				},
			},
			contentType : 'application/json',
			 data : JSON.stringify({
				
				name               : my_name ,
				family_sitter_name : my_family_sitter_name ,
				email              : my_email ,
				password           : my_password,
				date_of_birth      : my_date_of_birth ,
				gender             : my_gender,
				type               : my_type,
				user_image         : my_image
			}) 
		}).success(function (data) {
			
			if(data.status == 'true'){
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			app.setCookie('userId',data._embedded.id , '30');
			app.setCookie('refractivLog', 'true', '30');
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$.mobile.navigate(app.config.jobsPage);
	
				
			}
			else{
			$('.anErrorOccure').show();
			$(".anErrorOccure").delay(3000).fadeOut("slow");
			$('.anErrorOccure p').html(data.message);
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			}
		}).fail(function (jqXHR, textStatus, errorThrown, response, responseText) {
		});
	},
	loginAuthentication : function () {
		$.mobile.loading("show", {
			text : "",
			textVisible : false,
			theme : "b",
			html : ""
		});
		$('.ui-panel-dismiss').show();
		$.ajax({
			type : 'POST',
			url : app.config.baseURL + 'login',
			xhrFields : {
				withCredentials : true
			}, 
			statusCode : {
				401 : function (response) {
					$.mobile.navigate(app.config.loginPage);
					var data = JSON.parse(response.responseText);
					app.config.authdata = data.Message;
					$.mobile.loading("hide");
					$('.ui-panel-dismiss').hide();
					$(app.config.loginPage).find('.anErrorOccure').html("");
					$(app.config.loginPage).find('.anErrorOccure').show();
					$(app.config.loginPage).find('.anErrorOccure').html(data.Message);
					app.removeCookie('refractivLog');

				},
			},
			contentType : 'application/json',
			 data : JSON.stringify({
				email : $(app.config.loginPage).find('#email').val(),
				password : $(app.config.loginPage).find('#otc').val()
			}) 
		}).success(function (data) {
			if(data.status == 'true'){
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			app.setCookie('refractivLog', 'true', '30');
			app.setCookie('userId',data._embedded[0].id , '30');
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$.mobile.navigate(app.config.jobsPage);
	
				
			}
			else{
			$('.anErrorOccure').show();
			$(".anErrorOccure").delay(3000).fadeOut("slow");
			$('.anErrorOccure p').html(data.message);
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			}
		}).fail(function (jqXHR, textStatus, errorThrown, response, responseText) {
		});
	},
	logoutUser : function () {
		$('#pagetitle').text('Login');
		 app.removeCookie('refractivLog');
		 app.removeCookie('userId');
		 $("#jobsHBS").empty();
		 $("#profileHBS").empty();
		 $.mobile.navigate(app.config.loginPage);
	},
	home : function () {
		
		 //$.mobile.navigate(app.config.jobsPage);
	},
	forgotSend : function () {
		$('#pagetitle').text('Forgot Page');
		$.ajax({
			type : 'POST',
			url :  app.config.baseURL + 'forgotpassword',
			xhrFields : {
				withCredentials : true
			},
			contentType : 'application/json',
			data : JSON.stringify({
			 email : $(app.config.forgotPage).find('#email').val()
			}) 
		}).success(function () {
			$(app.config.forgotPage).find('#email').val('');
			app.setCookie('refractivLog', '', 0);
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$('.anErrorOccure').show();
			$(".anErrorOccure").delay(3000).fadeOut("slow");
			$('.anErrorOccure p').html("Password is sent via email.");
			$.mobile.navigate(app.config.signupPage);
		}).fail(function () {
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$('.anErrorOccure').show();
			$(".anErrorOccure").delay(3000).fadeOut("slow");
			$('.anErrorOccure p').html("Failed to send email. Please try again");
			
		});
	},
	isAppleDevice : function () {
		return (
			(navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
			(navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
			(navigator.userAgent.toLowerCase().indexOf("ipod") > -1));
	},
	renderTemplates : function (hbs, container, json) {
		var template = Handlebars.compile($(hbs).html());
		$(container).append(template(json));
	},
	panelHeight : function (elem) {
		hackHeight = $(elem).find('.ui-panel-wrapper').height();
		$(elem).find('.ui-panel').height(hackHeight);
	},
	jobsList : function () {
		
		$.mobile.loading("show", {
			text : "",
			textVisible : false,
			theme : "b",
			html : ""
		});
		
		$('.ui-panel-dismiss').show();
			$.ajax({
				url :  app.config.baseURL +'users/' + app.getCookie('userId'),
				xhrFields : {
					withCredentials : true
				}
			}).done(function (response) {
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				
				var data = response._embedded[0].hasMany[0].user_jobs;
				
				app.renderTemplates('#jobsHBS', '#jobsList', data);
				$.mobile.navigate(app.config.jobsPage);
				
				if ($('#jobsList').hasClass('ui-listview')) {
					$("#jobsList").listview('refresh');
				}
				
			}).fail(function(response){
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				$('.anErrorOccure').show();
				$(".anErrorOccure").delay(3000).fadeOut("slow");
				$('.anErrorOccure p').html("Failed to load.");
				//$.mobile.navigate(app.config.jobsPage);
			});
		

		$('#pagetitle').text('Full Jobs');
	},
	jobsDetails : function (jobId) {
		$.mobile.loading("show", {
			text : "",
			textVisible : false,
			theme : "b",
			html : ""
		});
		$('.ui-panel-dismiss').show();
			$.ajax({
				url :  app.config.baseURL + 'jobs/' + jobId,
				xhrFields : {
					withCredentials : true
				}
			}).done(function (response) {
				var data = response._embedded[0];
				app.renderTemplates('#jobsDetailHBS', '#jobsDetail', data);
				$.mobile.navigate(app.config.singlejobsDetail);
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
			}).fail(function (response) {
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				$('.anErrorOccure').show();
				$(".anErrorOccure").delay(3000).fadeOut("slow");
				$('.anErrorOccure p').html("Failed to load.");
			});

		$('#pagetitle').text('Single Job Details');
	},
	userProfile : function (userId) {
		$.mobile.loading("show", {
			text : "",
			textVisible : false,
			theme : "b",
			html : ""
		});
		$('.ui-panel-dismiss').show();
			$.ajax({
				url :  app.config.baseURL +'users/' + app.getCookie('userId'),
				xhrFields : {
					withCredentials : true
				}
			}).done(function (response) {
				var data = response._embedded[0];
				
				app.renderTemplates('#profileHBS', '#profile', data);
				$.mobile.navigate(app.config.profile);
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
			}).fail(function (response) {
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				$('.anErrorOccure').show();
				$(".anErrorOccure").delay(3000).fadeOut("slow");
				$('.anErrorOccure p').html("Failed to load.");
			});

		$('#pagetitle').text('Profile');
	},
	toTitleCase : function (str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	},
	getCheckbox : function (e) {
		if ($(e).is(':checked')) {
			$(e).val(true);
		} else {
			$(e).val(false);
		}
	},
	dateTime : function () {
		var date = new Date();
		return date.getUTCFullYear()
		 + '-' + app.pad(date.getUTCMonth() + 1)
		 + '-' + app.pad(date.getUTCDate())
		 + 'T' + app.pad(date.getUTCHours())
		 + ':' + app.pad(date.getUTCMinutes())
		 + ':' + app.pad(date.getUTCSeconds());
	},
	pad : function (n) {
		return n < 10 ? '0' + n : n;
	},
	getDateFilters : function (dates, type, container) {
		dates_html = '<fieldset data-role="controlgroup"><legend>Filter by date</legend>';
		var count = 1;
		var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
		var my_date = '';
		dates.forEach(function (date) {
			my_date = date.split("-");
			my_date = my_date[2] + " " + m_names[my_date[1] - 1] + " " + my_date[0];
			dates_html += '<input type="radio" name="' + type + '-dates" id="' + type + '-date-' + count + '" value="' + date + 'T00:00:00' + '" /><label for="' + type + '-date-' + count + '">' + my_date + '</label>';
			count++;
		});
		dates_html += '</fieldset>';
		$(container).html('');
		$(container).html(dates_html);
		$(container).trigger("create");
	},

	filterEvents : function (name, type) {
		var val = $("input[name=" + name + "]:checked").val();
		val = val.substring(0, 10);
		var data = JSON.parse(app.getLocalStorage(type));
		var grouped = _.groupBy(data, function (item) {
				return item.StartDate.substring(0, 10);
			});
		for (var key in grouped) {
			if (key == val) {
				$('.filterbydate' + key).show();
			} else {
				$('.filterbydate' + key).hide();
			}
		}
	}
}

/* Handlerbars Helper Section */

Handlebars.registerHelper("formatDate", function (datetime) {
	return moment(datetime).format('DD MMM YYYY');
});

Handlebars.registerHelper("replace", function (string, to_replace, replacement) {
	return (string || '').replace(to_replace, replacement);
});

Handlebars.registerHelper("sponsorType", function (key) {
	if (key == '0') {
		return 'Platinum';
	} else if (key == '1') {
		return 'Gold';
	} else if (key == '2') {
		return 'Silver';
	} else {
		return 'Sponsors';
	}
});

Handlebars.registerHelper("sponsorBack", function (key) {
	if (key == '0') {
		return '#80a0b5';
	} else if (key == '1') {
		return '#faaf40';
	} else if (key == '2') {
		return '#899196';
	} else {
		return '#001c58';
	}
});

Handlebars.registerHelper("formatTime", function (datetime) {
	return moment(datetime).format('HH:mm');
});

Handlebars.registerHelper("dateComparison", function (startdate, enddate) {

	start = new Date(startdate);
	start_day = start.getUTCDate();
	start_month = start.toGMTString().substring(8, 11);
	start_year = start.getUTCFullYear();

	end = new Date(enddate);
	end_day = end.getUTCDate();
	end_month = end.toGMTString().substring(8, 11);
	end_year = end.getUTCFullYear();

	sStamp = start.setHours(0, 0, 0, 0);
	eStamp = end.setHours(0, 0, 0, 0);
	if (sStamp !== eStamp) {
		return start_day + " " + start_month + " " + start_year + " - " + end_day + " " + end_month + " " + end_year;
	} else {
		return start_day + " " + start_month + " " + start_year;
	}
});

Handlebars.registerHelper("dataSubset", function (data, limit, val) {
	var html = '';
	var count = 0;
	limit = (data.length == limit || data.length <= limit || limit == '-1') ? data.length : limit;
	while (count < limit) {

		if (count == 0) {
			html = data[count][val];
		} else {
			html = html + ", " + data[count][val];
		}

		count++;
	}
	return html;
});
Handlebars.registerHelper("log", function (something) {
});
Handlebars.registerHelper('xIf', function (lvalue, operator, rvalue, options) {

	var operators,
	result;

	if (arguments.length < 3) {
		throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
	}

	if (options === undefined) {
		options = rvalue;
		rvalue = operator;
		operator = "===";
	}

	operators = {
		'==' : function (l, r) {
			return l == r;
		},
		'===' : function (l, r) {
			return l === r;
		},
		'!=' : function (l, r) {
			return l != r;
		},
		'!==' : function (l, r) {
			return l !== r;
		},
		'<' : function (l, r) {
			return l < r;
		},
		'>' : function (l, r) {
			return l > r;
		},
		'<=' : function (l, r) {
			return l <= r;
		},
		'>=' : function (l, r) {
			return l >= r;
		},
		'typeof' : function (l, r) {
			return typeof l == r;
		}
	};

	if (!operators[operator]) {
		throw new Error("'xIf' doesn't know the operator " + operator);
	}

	result = operators[operator](lvalue, rvalue);

	if (result) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});

$(document).on('ready', function (e) {

	$.ajaxSetup({
		headers : {
			"Accept" : "application/json",
			"Content-Type" : "application/json",
		}
	});
	app.setupSplash();
	

	$('.log-out').click(function () {
		app.logoutUser();
	});
    $('.profile-settings').click(function () {	
		$('#jobsHBS').empty();
		$.mobile.navigate(app.config.profile);
	});
	$('.my-jobs').click(function () {
		$('#profileHBS').empty();
		$.mobile.navigate(app.config.jobsPage);
	});

});

$(window).load(function () {
	page = $.mobile.path.get();
});

$(window).on("orientationchange", function () {
	if (window.orientation == 0) // Portrait
	{
		$("p").css();
	} else // Landscape
	{
		$("p").css();
	}
});

$(document).on('pagebeforeshow', app.config.splash, function () {
	app.navigateSplash();
});

$(document).on('pagebeforeshow', app.config.signupPage, function () {
	$(app.config.signupPage).find('#login_hook').bind("click", function () {
		$.mobile.navigate(app.config.loginPage);		
	}); 
	$(app.config.signupPage).find('#signup-btn').unbind("click");
	$(app.config.signupPage).find('#signup-btn').bind("click", function (event) {
		app.signupAuthentication();
	});
	$(app.config.signupPage).find('#file-1').bind("change", function (event) {
		if(this.files[0].size/1024 > 250 )
		{
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Image size must be less then 250 kb.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		
				if ( this.files && this.files[0] ) {
					var FR = new FileReader();
					FR.onload = function(e) {
						 $(app.config.signupPage).find('#dp').attr( "src", e.target.result );
						 $('#imageVal').val( e.target.result );
					};       
					FR.readAsDataURL( this.files[0] );
				}
		
	});
	
	
}); 
$(document).on('pagebeforeshow', app.config.loginPage, function () {
	var Storage = app.getCookie('refractivLog');
	if (typeof(Storage) !== "undefined" && Storage) {
		$.mobile.navigate(app.config.jobsPage);
	}
	
	$(app.config.loginPage).find('#forget').unbind("click");
	$(app.config.loginPage).find('#forget').bind("click", function (event) {
		app.showforgetpage();
		//$.mobile.navigate(app.config.forgotPage);
	}); 
	
	$(app.config.loginPage).find('#register').unbind("click");
	$(app.config.loginPage).find('#register').bind("click", function (event) {
		 event.preventDefault();
		$.mobile.navigate(app.config.signupPage);
		
	}); 

	$(app.config.loginPage).find('#login-btn').unbind("click");
	$(app.config.loginPage).find('#login-btn').bind("click", function (event) {
		app.loginAuthentication();
	});

});
$(document).on('pagebeforeshow', app.config.jobsPage, function () {
	app.jobsList();
});
$(document).on('pagebeforeshow', app.config.profile, function () {
	app.userProfile();
});
$(document).on('pageshow', function () {
	
	$(".profile-settings,.log-out").css("-webkit-font-smoothing", "antialiased");
});
$(document).on('pagebeforeshow', app.config.homePage, function () {
	
});

$(document).on('pagebeforeshow', app.config.forgotPage, function () {
	$(app.config.homePage).find('#forgot-send').unbind("click");
	$(app.config.homePage).find('#forgot-send').one("click", function (event) {
		$(this).unbind(event);
		app.forgotSend();
		
	});
}); 
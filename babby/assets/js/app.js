app = {
	config : {
		splash : '#splash',
		loginPage : '#login',
		signupPage : '#signup',
		forgotPage : '#forgot',
		homePage : '#homePage',
		dashboard : '#dashboard',
		jobsPage : '#jobsList',
	    alljobsPage : '#alljobsList',
		addjob   : '#jobsAdd',
		singlejobsDetail : '#jobsDetail',
		profile : '#profile',
		applicationsPage: '#applicationsList',
		//baseURL : 'http://babysitterconnection.com/api/public/',
		baseURL : 'http://localhost/pkg/public/',
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
	//	alert(page);
		if (page != 'homePage' && page != 'login' && page != '' && page != 'signup' && page != 'profile' && page != 'jobsDetail' && page !='jobsList' && page != 'jobsAdd' && page != 'applicationsList') {
			
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
	addUserjob: function(){
		
		job_name = $(app.config.addjob).find('#job_name').val();
		if(! job_name ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Job Title could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		job_date_ = $(app.config.addjob).find('#job_date').val();
		if(! job_date_ ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Job time could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		job_time_ = $(app.config.addjob).find('#job_time').val();
		if(! job_time_ ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Job time could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		job_discription = $(app.config.addjob).find('#job_discription').val();
		if(! job_discription ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Description could not be empty.");
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
			url : app.config.baseURL + 'jobs',
			xhrFields : {
				withCredentials : true
			}, 
			statusCode : {
				401 : function (response) {
					$.mobile.navigate(app.config.addjob);
					var data = JSON.parse(response.responseText);
					app.config.authdata = data.Message;
					$.mobile.loading("hide");
					$('.ui-panel-dismiss').hide();
					$(app.config.addjob).find('.anErrorOccure').html("");
					$(app.config.addjob).find('.anErrorOccure').show();
					$(app.config.addjob).find('.anErrorOccure').html(data.Message);
			

				},
			},
			contentType : 'application/json',
			 data : JSON.stringify({
				
				name               : job_name ,
				description : job_discription ,
				user_id     : app.getCookie('userId'),
				job_date    : job_date_,
				job_time    : job_time_
			}) 
		}).success(function (data) {
			
			if(data.status == 'true'){
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			app.setCookie('jobId_detail',data._embedded.job_id , '30');
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$('.Onsuccess').show();
			$(".Onsuccess").delay(5000).fadeOut("slow");
			$('.Onsuccess p').html("Job Added Successfully");
			setTimeout(function(){
				$.mobile.navigate(app.config.singlejobsDetail);
			},3000);
			 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
			 }else{
				  $('.myjobs').hide();
				   $('.myappliactions').show();
			 }
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
	signupAuthentication : function () {
		my_image = $(app.config.signupPage).find('#imageVal').val();
		/*if(! my_image  ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Please Select your profile image.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}*/
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
			app.setCookie('userType',data._embedded.type , '30');
			app.setCookie('userName',data._embedded.name , '30');
			app.setCookie('userGender',data._embedded.gender , '30');
			
			app.setCookie('refractivLog', 'true', '30');
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$.mobile.navigate(app.config.alljobsPage);
			 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
			 }else{
				  $('.myjobs').hide();
				   $('.myappliactions').show();
			 }
				
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
			app.setCookie('userType',data._embedded[0].type , '30');
			app.setCookie('userName',data._embedded[0].name , '30');
			app.setCookie('userGender',data._embedded[0].gender , '30');
			
			
			app.setCookie('refractivLog', 'true', '30');
			
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$.mobile.navigate(app.config.alljobsPage);
			 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
			 }else{
				  $('.myjobs').hide();
				   $('.myappliactions').show();
			 }
	
				
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
		 app.removeCookie('userType');
		 app.removeCookie('userName');
		 
		 app.removeCookie('jobId_detail');
		 app.removeCookie('jobId_trace');
		 app.removeCookie('userGender');
		 
		 
		 $("#jobsHBS").empty();
		 $("#profileHBS").empty();
		 $.mobile.navigate(app.config.loginPage);
	},
	home : function () {
		
		 //$.mobile.navigate(app.config.jobsPage);
	},
	forgotSend : function () {
		
		$('#pagetitle').text('Forgot Password');
		my_email = $(app.config.forgotPage).find('#email').val()
		if(! my_email ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Please input your email id.");
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
		$.ajax({
			type : 'POST',
			url :  app.config.baseURL + 'forgotpassword',
			xhrFields : {
				withCredentials : true
			},
			contentType : 'application/json',
			data : JSON.stringify({
			email : my_email
			}) 
		}).success(function (data) {
			if(data.status == "true"){
			$(app.config.forgotPage).find('#email').val('');
			app.setCookie('refractivLog', '', 0);
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$('.Onsuccess').show();
			$(".Onsuccess").delay(3000).fadeOut("slow");
			$('.Onsuccess p').html(data.message);
			}
			if(data.status == "false"){
			app.setCookie('refractivLog', '', 0);
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$('.anErrorOccure').show();
			$(".anErrorOccure").delay(3000).fadeOut("slow");
			$('.anErrorOccure p').html(data.message);
			}
			
			//$.mobile.navigate(app.config.signupPage);
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
		$(function(){
		var template = Handlebars.compile($(hbs).html());
		$(container).html(template(json));
		});
	},
	panelHeight : function (elem) {
		hackHeight = $(elem).find('.ui-panel-wrapper').height();
		$(elem).find('.ui-panel').height(hackHeight);
	},
	alljobsList : function(){
		$('#pagetitle').text('All Jobs');
		
		$.mobile.loading("show", {
			text : "",
			textVisible : false,
			theme : "b",
			html : ""
		});
		$('.ui-panel-dismiss').show();
		
			$.ajax({
				url :  app.config.baseURL +'jobs',
				xhrFields : {
					withCredentials : true
				}
			}).done(function (response) {
				
				
				var data = response._embedded.jobs[0];
				template = '<script id="jobsallHBS" type="x-handlebars-template">'+	
					'{{#each this}}'+
						'<div class="ui-body ui-body-a ui-corner-all" style="margin-bottom: 13px;">'+
								'<h1><i class="fa fa-hand-o-right"></i> {{name}}</h1>'+
								'<div class="ui-corner-all">'+
								'<h5 class="show_all"><i class="fa fa-clock-o"></i> Posted on: <span class="pull-right"> {{date_created}}</span></h5>'+
								'</div>'+
								'<a href="#"  data-role="button" data-inline="true" class="ui-btn-deep ui-link ui-btn ui-btn-inline ui-shadow ui-corner-all" onClick="app.intializeJobDetail({{id}} , 1);" data-id="{{id}}" role="button" style="width: 90%;"><i class="fa fa-paper-plane"></i> View Job Details</a>'+
					   '</div>'+
				   '{{/each}}'+
			'</script> ';
			 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
			 }else{
				  $('.myjobs').hide();
				   $('.myappliactions').show();
			 }
				app.renderTemplates(template, '#all-jobs-in', data);
				$.mobile.navigate(app.config.alljobsPage);
		        $.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				
			}).fail(function(response){
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				$('.anErrorOccure').show();
				$(".anErrorOccure").delay(3000).fadeOut("slow");
				$('.anErrorOccure p').html("Failed to load.");
				
			});
		

		
	},
	myApplications : function () {
		$('#pagetitle').text('My Applications');
		$.mobile.loading("show", {
			text : "",
			textVisible : false,
			theme : "b",
			html : ""
		});
		
		$('.ui-panel-dismiss').show();
			$.ajax({
				url :  app.config.baseURL +'bids?query=' + app.getCookie('userId'),
				xhrFields : {
					withCredentials : true
				}
			}).done(function (response) {
				
				
				var data = response._embedded;
				template = '<script id="applicationsHBS" type="x-handlebars-template">'+	
					'{{#each this}}'+
						'<div class="ui-body ui-body-a ui-corner-all" style="margin-bottom: 13px;">'+
								'<h1><i class="fa fa-hand-o-right"></i> {{name}}</h1>'+
								'<div class="ui-corner-all">'+
								'<h5 class="show_all"><i class="fa fa-user"></i> Applicant Name: <span class="pull-right"> {{applicant_name}}</span></h5>'+
								'<h5 class="show_all"><i class="fa fa-clock-o"></i> Applied  Date: <span class="pull-right"> {{date_created}}</span></h5>'+
								'<h5 class="show_all"><i class="fa fa-link"></i> Proposal: <span class="pull-right"> {{description}}</span></h5>'+
								'</div>'+
					   '</div>'+
				   '{{/each}}'+
			'</script> ';
				app.renderTemplates(template, '#applications-in', data);
				$.mobile.navigate(app.config.applicationsPage);
				 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
					 }else{
						  $('.myjobs').hide();
						   $('.myappliactions').show();
					 }
					 $.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
			}).fail(function(response){
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				$('.anErrorOccure').show();
				$(".anErrorOccure").delay(3000).fadeOut("slow");
				$('.anErrorOccure p').html("Failed to load.");
				//$.mobile.navigate(app.config.jobsPage);
			});
		

		
	},
	jobsList : function () {
		$('#pagetitle').text('My Jobs');
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
				
				
				var data = "";
				if("hasMany" in response._embedded[0]){
				 data = response._embedded[0].hasMany[0].user_jobs;
				}
				template = '<script id="jobsHBS" type="x-handlebars-template">'+	
					'{{#each this}}'+
						'<div class="ui-body ui-body-a ui-corner-all" style="margin-bottom: 13px;">'+
								'<h1><i class="fa fa-hand-o-right"></i> {{name}}</h1>'+
								'<div class="ui-corner-all">'+
								'<h5 class="show_all"><i class="fa fa-clock-o"></i> Posted on: <span class="pull-right"> {{date_created}}</span></h5>'+
								'</div>'+
								'<a href="#"  data-role="button" data-inline="true" class="ui-btn-deep ui-link ui-btn ui-btn-inline ui-shadow ui-corner-all" onClick="app.intializeJobDetail({{id}} , 2);" data-id="{{id}}" role="button" style="width: 90%;"><i class="fa fa-paper-plane"></i> View Job Details</a>'+
					   '</div>'+
				   '{{/each}}'+
			'</script> ';
				app.renderTemplates(template, '#jobs-in', data);
				$.mobile.navigate(app.config.jobsPage);
				 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
					 }else{
						  $('.myjobs').hide();
						   $('.myappliactions').show();
					 }
					 $.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
			}).fail(function(response){
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				$('.anErrorOccure').show();
				$(".anErrorOccure").delay(3000).fadeOut("slow");
				$('.anErrorOccure p').html("Failed to load.");
				//$.mobile.navigate(app.config.jobsPage);
			});
		

		
	},
	jobApply : function(this_job_id){
		$('#pagetitle').text('Job Application');
		apply_job_username = $(app.config.singlejobsDetail).find('#AJ-username').val();
		if(! apply_job_username ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Please enter your name.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		apply_job_name = $(app.config.singlejobsDetail).find('#AJ-name').val();
		if(! apply_job_name ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Application Subject is missing.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
	
		apply_job_discription = $(app.config.singlejobsDetail).find('#AJ-description').val();
		if(! apply_job_discription ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Details about you could not be empty.");
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
			url : app.config.baseURL + 'bids',
			xhrFields : {
				withCredentials : true
			}, 
			statusCode : {
				401 : function (response) {
					$.mobile.navigate(app.config.singlejobsDetail);
					var data = JSON.parse(response.responseText);
					app.config.authdata = data.Message;
					$.mobile.loading("hide");
					$('.ui-panel-dismiss').hide();
					$('.hide-click-apply').show();
					$(app.config.singlejobsDetail).find('.anErrorOccure').html("");
					$(app.config.singlejobsDetail).find('.anErrorOccure').show();
					$(app.config.singlejobsDetail).find('.anErrorOccure').html(data.Message);

				},
			},
			contentType : 'application/json',
			 data : JSON.stringify({
				name: apply_job_name ,
				description:apply_job_discription ,
				applicant_name:apply_job_username ,
				job_id: this_job_id,
				user_id: app.getCookie('userId')
				
				
			}) 
		}).success(function (data) {
			if(data.status == "false"){
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				$('.Onsuccess').show();
				$(".Onsuccess").delay(3000).fadeOut("slow");
				$('.Onsuccess p').html("You already applied for this job");
				$('.hide-by-default').hide();
				$('.hide-click-apply').show();
			}
			else{
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$('.Onsuccess').show();
			$(".Onsuccess").delay(3000).fadeOut("slow");
			$('.Onsuccess p').html("Application submitted Successfully");
			$('.hide-by-default').hide();
			$('.hide-click-apply').show();
			setTimeout(function(){
				
				app.jobsDetails();
				
			},1000);
			 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
				 }else{
					  $('.myjobs').hide();
					   $('.myappliactions').show();
				 }
				
			}
		}).fail(function (jqXHR, textStatus, errorThrown, response, responseText) {
		});
	},
	jobApplypage : function(id){
		$('.hide-click-apply').hide();
		$('.hide-by-default').show();
		
		
	},
	cancelapply : function(){
		$('.hide-by-default').hide();
		$('.hide-click-apply').show();
	}
	,
	jobsDetails : function () {
		$('#pagetitle').text('Job Details');
		$.mobile.loading("show", {
			text : "",
			textVisible : false,
			theme : "b",
			html : ""
		});
		
		$('.ui-panel-dismiss').show();
			$.ajax({
				url :  app.config.baseURL + 'jobs/' + app.getCookie('jobId_detail'),
				xhrFields : {
					withCredentials : true
				}
			}).done(function (response) {
			
				var data = response._embedded[0];
				template = '<script id="jobsDetailHBS" type="x-handlebars-template" >'+	
							'<div class="marginLeft">'+
									'<div class="ui-body ui-body-a ui-corner-all">'+
										'<h1><i class="fa fa-fax"></i> {{name}} </h1>'+
										'<div class="ui-corner-all" > <h5><i class="fa fa-calendar-o"></i> Job Date: <span class="pull-right"> {{job_date}}<span class="pull-right"> </h5></div>'+
										'<div class="ui-corner-all" > <h5><i class="fa fa-clock-o"></i> Job Time: <span class="pull-right"> {{job_time}}<span class="pull-right"> </h5></div>'+
										'<div class="ui-corner-all" > <h5><i class="fa fa-calendar"></i> Posted Date: <span class="pull-right"> {{date_created}}<span class="pull-right"> </h5></div>'+
									
										'<div class="ui-corner-all" > <h5><i class="fa fa-list-alt"></i> Description: <span class="pull-right"> {{description}}</span></h5></div>'+
										'<button type="button"  data-indivne="false" onclick="app.jobApplypage({{id}})" class="col-1 ui-btn-deep ui-btn-active ui-btn ui-shadow ui-corner-all pull-right hide-click-apply"><i class="lIcon fa fa-check"></i>Apply Now</button>'+
									'</div>'+
							'</div>'+
							'</script>';
				 if(app.getCookie('jobId_trace') == 1){
					 template3 = '<script id="applyjobseHBS" type="x-handlebars-template"> <h1>Apply for this Job</h1>'+		 
										   '<form id="editform">'+
												'<div class="listview" data-inset="true" >'+
													'<div class="fieldcontain">'+
														 '<input type="text" class="input-lovely" id="AJ-username" data-clear-btn="true" placeholder="Your Name" value="'+ app.getCookie('userName') +'">'+
													'</div>'+
													'<div class="fieldcontain">'+
														 '<input type="text" class="input-lovely" id="AJ-name" data-clear-btn="true" placeholder="Subject">'+
													'</div>'+
														'<div class="fieldcontain">'+
														 '<input type="text" class="input-lovely" id="AJ-description" data-clear-btn="true" placeholder="Proposal">'+
													'</div>'+
													'<div class="actions">'+
														 '<button type="button"  data-indivne="false" onclick="app.jobApply({{id}})" class="col-6 ui-btn-deep ui-btn-active ui-btn ui-shadow ui-corner-all"><i class="lIcon fa fa-check"></i>Apply Now</button>'+
														 '<button type="button"  data-inline="false" onclick="app.cancelapply()"   class="col-6 ui-btn-deep ui-btn-active ui-btn ui-shadow ui-corner-all"><i class="lIcon fa fa-times"></i>Cancel</button>'+
													
													'</div>'+
												'</div>'+
											'</form>'+
										'</script>';
							app.renderTemplates(template3, '#jobs-apply', data);
				 }
				 if(app.getCookie('jobId_trace') == 2){
					 template = '<script id="jobsDetailHBS" type="x-handlebars-template" >'+	
							'<div class="marginLeft">'+
									'<div class="ui-body ui-body-a ui-corner-all">'+
										'<h1><i class="fa fa-fax"></i> {{name}}<a href="#" class="pull-right small-icons" style="margin-left:10px;" onclick="app.showEditables()"><i class="fa fa-pencil"></i></a>&nbsp;&nbsp;&nbsp; <a href="#" class="pull-right small-icons" onclick="app.deleteJobb({{id}})"><i class="fa fa-times"></i></a></h1>'+
										'<div class="ui-corner-all" > <h5><i class="fa fa-calendar-o"></i> Job Date: <span class="pull-right"> {{job_date}}<span class="pull-right"> </h5></div>'+
										'<div class="ui-corner-all" > <h5><i class="fa fa-clock-o"></i> Job Time: <span class="pull-right"> {{job_time}}<span class="pull-right"> </h5></div>'+
										'<div class="ui-corner-all" > <h5><i class="fa fa-calendar"></i> Posted Date: <span class="pull-right"> {{date_created}}<span class="pull-right"> </h5></div>'+
									
										'<div class="ui-corner-all" > <h5><i class="fa fa-list-alt"></i> Description: <span class="pull-right"> {{description}}</span></h5></div>'+
								
									'</div>'+
							'</div>'+
							'</script>';
							template2 = '<script id="editprofileHBS" type="x-handlebars-template"> <h1>Update Job Details</h1>'+		 
										   '<form id="editform">'+
												'<div class="listview" data-inset="true" >'+
													'<div class="fieldcontain">'+
														 '<input type="text" class="input-lovely" id="EJ-name" data-clear-btn="true" value="{{name}}">'+
													'</div>'+
													'<div class="fieldcontain">'+
														 '<input type="date" class="input-lovely" id="EJ-job_date" data-clear-btn="true" value="{{job_date}}">'+
													'</div>'+
													'<div class="fieldcontain">'+
														 '<input type="time" class="input-lovely" id="EJ-job_time" data-clear-btn="true" value="{{job_time}}">'+
													'</div>'+
														'<div class="fieldcontain">'+
														 '<input type="text" class="input-lovely" id="EJ-description" data-clear-btn="true" value="{{description}}">'+
													'</div>'+
													'<div class="actions">'+
														 '<button type="button"  data-indivne="false" onclick="app.saveJobsEditables()" class="col-6 ui-btn-deep ui-btn-active ui-btn ui-shadow ui-corner-all"><i class="lIcon fa fa-check"></i>Save</button>'+
														 '<button type="button"  data-inline="false" onclick="app.cancelEditables()"   class="col-6 ui-btn-deep ui-btn-active ui-btn ui-shadow ui-corner-all"><i class="lIcon fa fa-times"></i>Cancel</button>'+
													
													'</div>'+
												'</div>'+
											'</form>'+
										'</script>';
							app.renderTemplates(template2, '#jobsdetail-in-edit', data);
				 }
				
				app.renderTemplates(template, '#jobsdetail-in', data);
				if(data.hasOwnProperty("hasMany")){
					template2 = '<script id="jobsDetailattendees" type="x-handlebars-template" >	'+	
							'<div class="attendee-actions">'+	
								'<div data-role="fieldcontain" class="flip-container">'+	
									'<h3><i class="fa fa-archive"></i> Applications:</h3>'+	
									'{{#each job_bids}}'+	
											' <div class="fancy-box-outer" style="margin-bottom:13px;" >'+	
												'	<h4><i class="fa fa-hand-o-right"></i> {{name}}</h4>'+	
												'	<div class="ui-body ui-body-a ui-corner-all" ><h5><i class="fa fa-user"></i> Applicant name:<span class="pull-right"> {{applicant_name}}</span></h5></div>'+	
												'	<div class="attendee-contacts clearfix">'+	
												'	<div class="ui-body ui-body-a ui-corner-all" ><h6><i class="fa fa-list-alt"></i> Details: <span class="pull-right">{{description}}</span></h6></div>'+	
												'	<div class="ui-body ui-body-a ui-corner-all" ><h6 class="show_all"><i class="fa fa-clock-o"></i><span> Applied Date:<span class="pull-right"> {{date_created}}</span></h6></div>'+		 
												'	</div>'+	
										  ' </div>'+	
									' {{/each}}'+	
								'</div>'+	
							'</div>'+	
							'</script>';
					app.renderTemplates(template2, '#attendees', data.hasMany[0]);
				}else{
					$('#attendees').empty();
				}
				
				setTimeout(function(){ 
                 $.mobile.navigate(app.config.singlejobsDetail);
				}, 0);
				
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
			 }else{
				  $('.myjobs').hide();
				   $('.myappliactions').show();
			 }
				
			}).fail(function (response) {
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				$('.anErrorOccure').show();
				$(".anErrorOccure").delay(3000).fadeOut("slow");
				$('.anErrorOccure p').html("Failed to load.");
			});

		$('#pagetitle').text('Job Details');
	},
	deleteJobb : function(job_id){
		$.mobile.loading("show", {
			text : "",
			textVisible : false,
			theme : "b",
			html : ""
		});
		
		$('.ui-panel-dismiss').show();
		$.ajax({
			type : 'DELETE',
			url : app.config.baseURL + 'jobs/'  + job_id,
			xhrFields : {
				withCredentials : true
			}, 
			statusCode : {
				401 : function (response) {
					$.mobile.navigate(app.config.singlejobsDetail);
					var data = JSON.parse(response.responseText);
					app.config.authdata = data.Message;
					$.mobile.loading("hide");
					$('.ui-panel-dismiss').hide();
					$(app.config.singlejobsDetail).find('.anErrorOccure').html("");
					$(app.config.singlejobsDetail).find('.anErrorOccure').show();
					$(app.config.singlejobsDetail).find('.anErrorOccure').html(data.Message);

				},
			},
			contentType : 'application/json',
			 data : JSON.stringify({
				
				
				
			}) 
		}).success(function (data) {
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			$('.Onsuccess').show();
			$(".Onsuccess").delay(3000).fadeOut("slow");
			$('.Onsuccess p').html("Job deleted Successfully");
			setTimeout(function(){
				app.jobsList();
				$('.hide-edit').show();
	            $('.hide-save').hide();
			},3000);
			
		}).fail(function (jqXHR, textStatus, errorThrown, response, responseText) {
		});
		
	}
	,
	userProfile : function (userId) {
		$('#pagetitle').text('Profile');
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
				template = '<script id="profileHBS" type="x-handlebars-template" >'+
				
					'<div class="ui-grid-a breakpoint">'+
						'<div class="ui-block-a1">'+
							'<div class="marginRight">'+
								'<div class="page-icon"><img src="{{#if user_image}}{{user_image}}{{else}}assets/images/user_placeholder.png{{/if}}" /></div>'+
							'</div>'+
						'</div>'+
						'<div class="ui-block-b2 ">'+
							'<div class="marginLeft">'+
								'<div class="page-detail event">'+
									'<div class="event-summery clearfix">'+
										'<h1><span class="">{{name}}</span>'+
										'<a href="#" class="pull-right  edit-profile" onclick="app.showEditables()"><i class="fa fa-pencil"></i></a>'+
										'</h1>'+ 
									'</div>'+
									'<div class="ui-body ui-body-a ui-corner-all">'+
										'<h4><a href="#"><i class="fa fa-child"></i>Gender:</a>  <span class="pull-right gender">{{gender}}</span></h4>'+	
									'</div>'+
									'<div class="ui-body ui-body-a ui-corner-all">'+
										'<h4><a href="#"><i class="fa fa-university"></i>Family/Sitter Name:</a> <span class="pull-right family_sitter_name">{{family_sitter_name}}</span></h4>'+	
									'</div>'+
									'<div class="ui-body ui-body-a ui-corner-all">'+
										'<h4><a href="#"><i class="fa fa-calendar-o"></i>Date of Birth:</a> <span class="pull-right date_of_birth">{{date_of_birth}}</span> </h4>'+	
									'</div>'+
									'<div class="ui-body ui-body-a ui-corner-all">'+
									'<h4><a href="#"><i class="fa fa-cubes"></i>Type:</a> <span class="pull-right type">{{type}}</span></h4 >'+		
									'</div>'+
									'<div class="ui-body ui-body-a ui-corner-all">'+
									'<h4><a href="#"><i class="fa fa-envelope"></i>Email:</a><span class="pull-right">{{email}}</span>'+
									'</h4>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
			'</script>';
			
			type_sitter = '';
			type_family = '';
			if(data.type == "Family"){
				app.setCookie('userType', 'Family' , '30');
				type_family = 'checked';
			}else{
				type_sitter = 'checked';
				app.setCookie('userType', 'Sitter' , '30');
			}
			type_male = '';
			type_female = '';
			if(data.gender == "Male"){
				type_male = 'checked';
				app.setCookie('userGender', 'Male' , '30');
			}else{
				type_female = 'checked';
				app.setCookie('userGender', 'Female' , '30');
			}
			
			
			template2 = '<script id="editprofileHBS" type="x-handlebars-template">'+
					   '<form id="editform">'+
							 '<div class="listview" data-inset="true" >'+
							'<div class="fieldcontain" >'+
								
								'<div class="ui-block-a1 marginRight" >'+
								'<div id="E-profile-image" class="page-icon" >'+ 
								'<label for="file-2" ><img id="E-dp" src="{{#if user_image}}{{user_image}}{{else}}assets/images/user_placeholder.png{{/if}}" height="100" width="100"> <span class="text-content"><span>Upload Image</span></span> </label>'+
								'</div>'+
								 '</div>'+
								 '<label for="file-2" class="custom-file-upload">'+
								'<i class="fa fa-cloud-upload"></i> Browse Image</label>'+
								 '<input type="file" onchange="app.updateUserUmage.call(this, event);" data-clear-btn="false" name="file-2" id="file-2" accept="image/*" class="ui-fixed-hidden">'+
							'</div>'+
							'<input type="hidden" id="E-imageVal" value="{{user_image}}">'+
							'<div class="fieldcontain">'+
								 '<input type="text" class="input-lovely" id="E-name" data-clear-btn="true" value="{{name}}">'+
							'</div>'+
								'<div class="fieldcontain">'+
								 '<input type="text" class="input-lovely" id="E-familyname" data-clear-btn="true" value="{{family_sitter_name}}">'+
							'</div>'+
							'<div class="fieldcontain">'+
								 '<input type="date" class="input-lovely" data-clear-btn="false" name="E-date-1" id="E-date-1" value="{{date_of_birth}}">'+
							'</div>'+
							'<div class="col-6">'+
								'Gender'+
							'</div>'+
							'<div class="col-6">'+
								'Type'+
							'</div>'+
							'<div class="col-6">'+ 
				                   '<div class="col-6">'+
								'<div class="col-6">'+
								'<input class="radio-show" type="radio" id="E-Male" value="Male" '+ type_male +' name="radio-group-3" />'+
								'</div>'+
								'<div class="col-6">'+
								'<label for="Male">Male</label>'+
								'</div>'+
								'</div>'+
								'<div class="col-6">'+
								'<div class="col-6">'+
								'<input class="radio-show"type="radio" id="E-Female" value="Female" '+ type_female +' name="radio-group-3" />'+
								'</div>'+
								'<div class="col-6">'+
								'<label for="Female">Female</label>'+
								    '</div>'+
								   '</div>'+
							'</div>'+
							'<div class="col-6">'+
								'<div class="col-6">'+
								'<div class="col-6">'+
								'<input class="radio-show"  type="radio" id="E-Family" value="Family" '+ type_family +' name="radio-group-4" />'+
								'</div>'+
								'<div class="col-6">'+
								'<label for="Family">Family</label>'+
								'</div>'+
								'</div>'+
								'<div class="col-6">'+
								'<div class="col-6">'+
								'<input class="radio-show" type="radio" id="E-Sitter" value="Sitter" '+ type_sitter +' name="radio-group-4" />'+
									'</div>'+
								'<div class="col-6">'+
								'<label for="Sitter">Sitter</label>'+
									'</div>'+
								   '</div>'+
							'</div>'+
							'<div>'+
								 '<button type="button"  data-indivne="false" onclick="app.saveEditables()" class="col-6 ui-btn-deep ui-btn-active ui-btn ui-shadow ui-corner-all"><i class="lIcon fa fa-check"></i>Save</button>'+
								 '<button type="button"  data-inline="false" onclick="app.cancelEditables()"   class="col-6 ui-btn-deep ui-btn-active ui-btn ui-shadow ui-corner-all"><i class="lIcon fa fa-times"></i>Cancel</button>'+
							
							'</div>'+
							 '</div>'+
						'</form>'+
						'</script>';
				app.renderTemplates(template, '#profile-in', data);
				app.renderTemplates(template2, '#edit-profile-form', data);
				$.mobile.navigate(app.config.profile);
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
					 }else{
						  $('.myjobs').hide();
						   $('.myappliactions').show();
					 }
			}).fail(function (response) {
				$.mobile.loading("hide");
				$('.ui-panel-dismiss').hide();
				$('.anErrorOccure').show();
				$(".anErrorOccure").delay(3000).fadeOut("slow");
				$('.anErrorOccure p').html("Failed to load.");
			});

		$('#pagetitle').text('Profile');
	},
	updateUserUmage  : function(event){

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
				 $('#E-dp').attr( "src", e.target.result );
				 $('#E-imageVal').val( e.target.result );
			};       
			FR.readAsDataURL( this.files[0] );
		}
	  
	},
		saveJobsEditables  : function(){
		my_job_name = $(app.config.singlejobsDetail).find('#EJ-name').val();
		if(! my_job_name ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Job title could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_job_date = $(app.config.singlejobsDetail).find('#EJ-job_date').val();
		if(! my_job_date ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Job date could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_job_time = $(app.config.singlejobsDetail).find('#EJ-job_time').val();
		if(! my_job_time ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Job title could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_job_discription = $(app.config.singlejobsDetail).find('#EJ-description').val();
		if(! my_job_discription ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Job Description could not be empty.");
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
			type : 'PATCH',
			url : app.config.baseURL + 'jobs/'  +  app.getCookie('jobId_detail'),
			xhrFields : {
				withCredentials : true
			}, 
			statusCode : {
				401 : function (response) {
					$.mobile.navigate(app.config.profile);
					var data = JSON.parse(response.responseText);
					app.config.authdata = data.Message;
					$.mobile.loading("hide");
					$('.ui-panel-dismiss').hide();
					$(app.config.profile).find('.anErrorOccure').html("");
					$(app.config.profile).find('.anErrorOccure').show();
					$(app.config.profile).find('.anErrorOccure').html(data.Message);

				},
			},
			contentType : 'application/json',
			 data : JSON.stringify({
				
				name               : my_job_name ,
				description : my_job_discription ,
				job_date : my_job_date,
				job_time : my_job_time
				
			}) 
		}).success(function (data) {
			if(data.status){
				
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			
			$('.Onsuccess').show();
			$(".Onsuccess").delay(3000).fadeOut("slow");
			$('.Onsuccess p').html("Job Information Updated Successfully");
			setTimeout(function(){
				app.jobsDetails();
				$('.hide-edit').show();
	            $('.hide-save').hide();
			},3000);
			}
			else{
			$('.anErrorOccure').show();
			$(".anErrorOccure").delay(3000).fadeOut("slow");
			$('.anErrorOccure p').html(data.message);
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			}
			 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
			 }else{
				  $('.myjobs').hide();
				   $('.myappliactions').show();
			 }
		}).fail(function (jqXHR, textStatus, errorThrown, response, responseText) {
		});
	  
	},
	saveEditables  : function(){
    
		my_image = $(app.config.profile).find('#E-imageVal').val();
		my_name = $(app.config.profile).find('#E-name').val();
		if(! my_name ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Name could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_family_sitter_name = $(app.config.profile).find('#E-familyname').val();
		if(! my_family_sitter_name ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Family name could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
	
		my_date_of_birth= $(app.config.profile).find('#E-date-1').val();
		if(! my_date_of_birth ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Date of Birth could not be empty.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_gender = $(app.config.profile).find('input:radio[name=radio-group-3]:checked').val();
		if(! my_gender ){
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Please Select Your Gender.");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		my_type = $(app.config.profile).find('input:radio[name=radio-group-4]:checked').val();
		if(! my_type ){
		
		$("html, body").animate({ scrollTop: "0" });
		$('.anErrorOccure').show();
		$('.anErrorOccure p').html("Please Select Type .");
	    $(".anErrorOccure").delay(3000).fadeOut("slow");
		$('.ui-panel-dismiss').hide();
		return false;
		}
		if(my_type){
			app.setCookie('userType',my_type , '30');
		}
					
		$.mobile.loading("show", {
			text : "",
			textVisible : false,
			theme : "b",
			html : ""
		});
		
		$('.ui-panel-dismiss').show();
		$.ajax({
			type : 'PATCH',
			url : app.config.baseURL + 'users/'  +  app.getCookie('userId'),
			xhrFields : {
				withCredentials : true
			}, 
			statusCode : {
				401 : function (response) {
					$.mobile.navigate(app.config.profile);
					var data = JSON.parse(response.responseText);
					app.config.authdata = data.Message;
					$.mobile.loading("hide");
					$('.ui-panel-dismiss').hide();
					$(app.config.profile).find('.anErrorOccure').html("");
					$(app.config.profile).find('.anErrorOccure').show();
					$(app.config.profile).find('.anErrorOccure').html(data.Message);

				},
			},
			contentType : 'application/json',
			 data : JSON.stringify({
				
				name               : my_name ,
				family_sitter_name : my_family_sitter_name ,
				date_of_birth      : my_date_of_birth ,
				gender             : my_gender,
				type               : my_type,
				user_image         : my_image
			}) 
		}).success(function (data) {
			if(data.status == 'true'){
				
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			
			$('.Onsuccess').show();
			$(".Onsuccess").delay(3000).fadeOut("slow");
			$('.Onsuccess p').html("Information Updated Successfully");
			setTimeout(function(){
				app.userProfile();
				$('.hide-edit').show();
	            $('.hide-save').hide();
			},3000);
			}
			else{
			$('.anErrorOccure').show();
			$(".anErrorOccure").delay(3000).fadeOut("slow");
			$('.anErrorOccure p').html(data.message);
			$.mobile.loading("hide");
			$('.ui-panel-dismiss').hide();
			}
			 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
			 }else{
				  $('.myjobs').hide();
				   $('.myappliactions').show();
			 }				
		}).fail(function (jqXHR, textStatus, errorThrown, response, responseText) {
		});
	  
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
	},
	intializeJobDetail: function(id, trace){
		
	 app.setCookie('jobId_detail', id , '30');
	 app.setCookie('jobId_trace', trace , '30');
	 //app.jobsDetails();
	 $.mobile.navigate(app.config.singlejobsDetail);
	 
	},
	showEditables: function(){
	 
	 //$('.edit-profile').hide();
	 $('.hide-edit').hide();
	 $('.hide-save').show();
	// $('.cancel-edit-profile').show();
	 
	}
	,
	cancelEditables: function(){
	 $('.hide-edit').show();
	  $('.hide-save').hide();
	},
	myJobs: function(){
		$.mobile.navigate(app.config.jobsPage);
	},
	allJobs: function(){
		$.mobile.navigate(app.config.alljobsPage);
		
	},
	loadUserProfile: function(){
			$.mobile.navigate(app.config.profile);
	},
	renderAddjob: function(){
		
		template = '<form name="addjob">'+
						'<div class="fieldcontain">'+
						  '<input type="text" class="input-lovely" id="job_name" placeholder="Job Title/Name" value="'+ app.getCookie('userName')+'">'+
						'</div>'+
						'<div class="fieldcontain">'+
						  '<input type="date" class="input-lovely" id="job_date" placeholder="Job date">'+
						'</div>'+
						'<div class="fieldcontain">'+
						  '<input type="time" class="input-lovely" id="job_time" placeholder="Job time">'+
						'</div>'+
						'<div class="fieldcontain">'+
						  '<input type="text" class="input-lovely" id="job_discription" placeholder="Job discription">'+
						'</div>'+
						'<div>'+
						  '<br><button type="button" data-inline="false" onclick="app.addUserjob()" class="col-12 ui-btn-deep ui-btn-active ui-btn ui-shadow ui-corner-all"><i class="lIcon fa fa-floppy-o"></i>Save New Job</button>'+
						'</div>'+
					'</form>';
			data ="";
			 if(app.getCookie('userType') == 'Family'){
				 $('.myappliactions').hide();
				  $('.myjobs').show();
			 }else{
				  $('.myjobs').hide();
				   $('.myappliactions').show();
			 }
			app.renderTemplates(template, '#jobs-add', data);
			$.mobile.navigate(app.config.addjob);
		
		
	},
	addNewJob: function(){
		$.mobile.navigate(app.config.addjob);
		
	},
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
		//app.showforgetpage();
		$.mobile.navigate(app.config.forgotPage);
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

$(document).on('pagebeforeshow', app.config.addjob, function () {
	app.renderAddjob();
	
});
$(document).on('pagebeforeshow', app.config.jobsPage, function () {
	app.jobsList();
	
});
$(document).on('pagebeforeshow', app.config.alljobsPage, function () {
	app.alljobsList();
	
	
});
$(document).on('pagebeforeshow', app.config.applicationsPage, function () {
	app.myApplications();
	
	
});
$(document).on('pagebeforeshow', app.config.singlejobsDetail, function () {
	app.jobsDetails();
});
$(document).on('pagebeforeshow', app.config.profile, function () {
	
	app.userProfile();
});
$(document).on('pageshow', app.config.profile, function () {
		
	   
});
$(document).on('pageshow', function () {
	
	$(".profile-settings,.log-out").css("-webkit-font-smoothing", "antialiased");
});
$(document).on('pagebeforeshow', app.config.homePage, function () {
	
});

$(document).on('pagebeforeshow', app.config.forgotPage, function () {
	$(app.config.forgotPage).find('#login_hook').bind("click", function () {
		$.mobile.navigate(app.config.loginPage);		
	}); 
	//$(app.config.homePage).find('#forgot-send').unbind("click");
	$(app.config.forgotPage).find('#forgot-send').on("click", function (event) {
		//$(this).unbind(event);
		app.forgotSend();
		
	});
}); 

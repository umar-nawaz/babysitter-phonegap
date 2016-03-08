app = {
	config : {
		splash : '#splash',
		loginPage : '#login',
		signupPage : '#signup',
		forgotPage : '#forgot',
		homePage : '#homePage',
		dashboard : '#dashboard',
		jobsPage : '#jobsList',
		addjob   : '#jobsAdd',
		singlejobsDetail : '#jobsDetail',
		profile : '#profile',
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
		if (page != 'homePage' && page != 'login' && page != '' && page != 'signup' && page != 'profile' && page != 'jobsDetail' && page !='jobsList' && page != 'jobsAdd') {
			
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
				user_id     : app.getCookie('userId')
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
		 app.removeCookie('');
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
		$(function(){
		var template = Handlebars.compile($(hbs).html());
		$(container).html(template(json));
		});
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
				template = '<script id="jobsHBS" type="x-handlebars-template">'+	
					'{{#each this}}'+
						'<div class="ui-body ui-body-a ui-corner-all" style="margin-bottom: 13px;">'+
								'<h2><i class="fa fa-hand-o-right"></i> {{name}}</h2>'+
								'<div class="ui-corner-all">'+
								'<h5 class="show_all"><i class="fa fa-clock-o"></i> Posted on: <span class="pull-right"> {{date_created}}</span></h5>'+
								'</div>'+
								'<a href="#"  data-role="button" data-inline="true" class="ui-btn-deep ui-link ui-btn ui-btn-inline ui-shadow ui-corner-all" onClick="app.intializeJobDetail({{id}});" data-id="{{id}}" role="button" style="width: 90%;"><i class="fa fa-paper-plane"></i> View Job Details</a>'+
					   '</div>'+
				   '{{/each}}'+
			'</script> ';
				app.renderTemplates(template, '#jobs-in', data);
				$.mobile.navigate(app.config.jobsPage);
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
	jobsDetails : function () {
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
										'<h1><i class="fa fa-fax"></i> {{name}}<a href="#" class="pull-right" style="margin-left:10px;" onclick="app.showEditablesJobs()"><i class="fa fa-pencil"></i></a>&nbsp;&nbsp;&nbsp; <a href="#" class="pull-right" onclick="app.deleteJobb()"><i class="fa fa-times"></i></a></h1>'+
										'<div class="ui-corner-all" > <h5><i class="fa fa-clock-o"></i> Posted Date: <span class="pull-right"> {{date_created}}<span class="pull-right"> </h5></div>'+
										'<div class="ui-corner-all" > <h5><i class="fa fa-list-alt"></i> Description: <span class="pull-right"> {{description}}</span></h5></div>'+
									'</div>'+
							'</div>'+
							'</script>';
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
								'<input class="radio-show" type="radio" id="E-Male" value=" Male" name="radio-group-3" />'+
								'</div>'+
								'<div class="col-6">'+
								'<label for="Male">Male</label>'+
								'</div>'+
								'</div>'+
								'<div class="col-6">'+
								'<div class="col-6">'+
								'<input class="radio-show"type="radio" id="E-Female" value=" Female" name="radio-group-3" />'+
								'</div>'+
								'<div class="col-6">'+
								'<label for="Female">Female</label>'+
								    '</div>'+
								   '</div>'+
							'</div>'+
							'<div class="col-6">'+
								'<div class="col-6">'+
								'<div class="col-6">'+
								'<input class="radio-show"  type="radio" id="E-Family" value="Family" name="radio-group-4" />'+
								'</div>'+
								'<div class="col-6">'+
								'<label for="Family">Family</label>'+
								'</div>'+
								'</div>'+
								'<div class="col-6">'+
								'<div class="col-6">'+
								'<input class="radio-show" type="radio" id="E-Sitter" value="Sitter" name="radio-group-4" />'+
									'</div>'+
								'<div class="col-6">'+
								'<label for="Sitter">Sitter</label>'+
									'</div>'+
								   '</div>'+
							'</div>'+
							'<div>'+
								 '<button type="button"  data-indivne="false" onclick="app.saveEditables()" class="col-6 ui-btn-deep ui-btn-active ui-btn ui-shadow ui-corner-all"><i class="lIcon fa fa-check"></i>Save Changes</button>'+
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
	intializeJobDetail: function(id){
		
	 app.setCookie('jobId_detail',id , '30');
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
	loadUserProfile: function(){
			$.mobile.navigate(app.config.profile);
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
	$(app.config.homePage).find('#forgot-send').unbind("click");
	$(app.config.homePage).find('#forgot-send').one("click", function (event) {
		$(this).unbind(event);
		app.forgotSend();
		
	});
}); 
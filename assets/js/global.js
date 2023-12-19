var $Global = {};
_initGlobal($Global);

//Catch Errors Functions
//--------------------------------------------------------------------------
window.onerror = function(messageOrEvent, source, lineno, colno, error) {
	_onJavascriptError({
		catchFrom: "window.onerror = function (messageOrEvent, source, lineno, colno, error)",
		params: {
			messageOrEvent: messageOrEvent,
			source: source,
			lineno: lineno,
			colno: colno
		}
	}, error);

	return true;
};

function _logCatchedException(e) {
	_onJavascriptError({
		catchFrom: "function _logCatchException(e)",
		params: []
	}, e);
}

function _logAngularError(error, cause) {
	_onJavascriptError({
		catchFrom: "function _logAngularError(error, cause)",
		params: [cause]
	}, error);
}

function _onJavascriptError(pdebugInfo, error) {
	var msgError = "";
	var stackInfo = "";
	var detailError = "<h5 class='color-danger'>Details:</h5><pre>" + _htmlEscape(_toJSON(pdebugInfo)) + "</pre>";
	var fullErrorMsg = "";

	if (error) {
		msgError = "<h5 class='color-danger'>Error Msg:</h5><pre>" + _htmlEscape(error.toString()) + "</pre>";
		stackInfo = "<h5 class='color-danger'>Stack:</h5><pre>" + _htmlEscape(error.stack) + "</pre>";
	}

	fullErrorMsg += (msgError ? msgError : "");
	fullErrorMsg += (stackInfo ? stackInfo : "");
	fullErrorMsg += detailError;

	_showModal({
		id: "jsError" + _createCustomID(),
		size: "modal-size-full",
		contentHtml: fullErrorMsg,
		title: "<span class='color-danger'><i class='icmn-fire'></i> Javascript Error Details </span>"
	});

	$("#fullLoadingPageAsync").remove();

	//alert(messageOrEvent);
	//if (_errorWasThrow == false) {
	//    _errorWasThrow = true;

	//    var textSource = _httpGet(source);
	//    var lines = textSource.split(/\r\n|\r|\n/);

	//    var errorHTML =
	//        "<h3>Javascript error information:</h3>" +
	//        "<b>Error message:</b><pre>" + messageOrEvent + "</pre><br />" +
	//        "<b>URL:</b><pre>" + source + "</pre><br />" +
	//        "<b>Line Number:</b><pre>" + lineno + "</pre><br />" +
	//        "<b>Col Number:</b><pre>" + colno + "</pre><br />" +
	//        "<b>Error Code preview:</b><pre>" +

	//        (lineno - 3) + ": " + lines[lineno - 4] + "<br />" +
	//        (lineno - 2) + ": " + lines[lineno - 3] + "<br />" +
	//        (lineno - 1) + ": " + lines[lineno - 2] + "<br />" +
	//        "<b style='color:red;'>" + (lineno) + ": " + lines[lineno - 1] + "</b><br />" +
	//        (lineno) + ": " + lines[lineno + 1] + "<br />" +
	//        (lineno + 1) + ": " + lines[lineno + 2] + "<br />" +
	//        (lineno + 2) + ": " + lines[lineno + 3] + "<br />" +

	//        "</pre><br />";

	//    var strStyle =
	//        "<style> " +
	//        "    pre { " +
	//        "        display: block; " +
	//        "        padding: 9.5px; " +
	//        "        margin: 0 0 10px; " +
	//        "        font-size: 13px; " +
	//        "        line-height: 1.42857143; " +
	//        "        color: #333; " +
	//        "        word-break: break-all; " +
	//        "        word-wrap: break-word; " +
	//        "        background-color: #f5f5f5; " +
	//        "        border: 1px solid #ccc; " +
	//        "        white-space: pre-wrap; " +
	//        "    } " +
	//        "</style>";


	//    document.head.innerHTML = strStyle;

	//    if (!document.body) {
	//        var body = document.createElement("body");
	//        document.documentElement.appendChild(body);
	//    }
	//    document.body.innerHTML = errorHTML;
	//}
}

function _htmlEscape(str) {
	str = _replaceAll(str, "&", '&amp;');
	str = _replaceAll(str, '"', '&quot;');
	str = _replaceAll(str, "'", '&#39;');
	str = _replaceAll(str, "<", '&lt;');
	str = _replaceAll(str, ">", '&gt;');

	return str;
}

function _consoleLog(obj) {
	_showModal({
		id: "consoleLog" + _createCustomID(),
		size: "modal-size-full",
		contentHtml: "<pre>" + _htmlEscape(_toJSON(obj)) + "</pre>",
		title: "<span class='color-primary'><i class='icmn-bomb'></i> Console Log </span>"
	});
}

//Download missing files from other web site
//--------------------------------------------------------------------------
/*window.addEventListener('error', function (e) {
	_onJavascriptError({
		catchFrom: "window.addEventListener('error', function (e) {})",
		params: [e]
	}, (new Error));
	//_downloadMissingFileFromError(e);
}, true);*/

function _downloadMissingFileFromError(e) {
	//Save missing web site file functions

	var fileURL = "";

	if ($(e.path[0]).attr('href')) {
		fileURL = $(e.path[0]).attr('href');
	}

	if ($(e.path[0]).attr('src')) {
		fileURL = $(e.path[0]).attr('src');
	}

	fileURL = _replaceAll(fileURL, "pages/", 'http://cleanuitemplate.com/package/livepreview/pages/');
	fileURL = _replaceAll(fileURL, "../", 'http://cleanuitemplate.com/package/');
	fileURL = _replaceAll(fileURL, "https://clean-admin-framework-krlosnando.c9users.io/", 'http://cleanuitemplate.com/package/');

	//Download missing file
	if (_contains(fileURL, "cleanuitemplate.com")) {
		alert('Missing File: Path:' + _replaceAll(fileURL, 'http://cleanuitemplate.com/package/', '/') + ', URL: ' + fileURL);
		//console.log(_replaceAll(fileURL, 'http://cleanuitemplate.com/package/', '/'), fileURL);
		//_saveFileInServer(_replaceAll(fileURL, 'http://cleanuitemplate.com/package/', '/'), fileURL);
	}
}

function _saveFileInServer(pathToSave, urlFile) {
	//_saveFileInServer("/apps/assets/common/img/temp/avatars/1.jpg", "http://cleanuitemplate.com/package/assets/common/img/temp/avatars/1.jpg");
	console.log(pathToSave, urlFile);

	$.ajax({
		url: '/download-file',
		data: {
			pathToSave: pathToSave,
			urlFile: urlFile
		},
		beforeSend: function() {
			console.log('Saving file ("' + urlFile + '") ...');
		},
		success: function(response) {
			console.log('File Saved! ("' + urlFile + '", "' + response.pathToSave + '").');
		},
		error: function(xhr, textStatus, thrownError) {
			console.log('Error on save file ("' + urlFile + '").', xhr, textStatus, thrownError);
		},
		type: 'GET'
	});
}

function _saveAllSourceWebSite() {
	//Save all angular files
	$('a').each(function() {
		var $el = $(this);
		if (($el.attr('href').charAt(0) == "#") && $el.attr('href').length > 1) {
			var srcFile = $el.attr('href').replace('#', '') + '.html';
			//console.log(srcFile);
			_saveFileInServer(srcFile, "http://cleanuitemplate.com/package/livepreview" + srcFile);
		}
	});
}

function _httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false); // false for synchronous request
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

//Notification, Messages and Alert Functions
//--------------------------------------------------------------------------
function _showTopBarLoading(customOptions) {
	var options = {};

	// Merge customOptions into options recursive
	$.extend(true, options, customOptions);

	NProgress.done();
	if (options.text) {
		NProgress.configure({
			text: options.text
		});
	}
	NProgress.start();
}

function _hideTopBarLoading() {
	NProgress.done();
}

function _showNotification(customOptions) {
	var options = {
		title: "<strong>Mensaje: </strong> ",
		text: "Mensaje al usuario",
		icon: 'fa fa-wechat',

		//default : primary : secondary : success : warning : danger : info
		type: 'primary'
	};

	// Merge customOptions into options recursive
	$.extend(true, options, customOptions);

	//"This plugin has been provided to you by Robert McIntosh aka <a href=\"https://twitter.com/Mouse0270\" target=\"_blank\">@mouse0270</a>"
	$.notify({
		icon: options.icon,
		title: options.title,
		message: options.text
	}, {
		type: options.type,
		delay: 10000
	});
}

function _showConfirmModal(customOptions) {
	var options = {
		title: "Si borras el archivo no se podra recuperar..",
		text: "Mensaje al usuario",

		//default : primary : secondary : success : warning : danger : info
		type: 'primary'
	};

	// Merge customOptions into options recursive
	$.extend(true, options, customOptions);

	swal({
			title: options.title,
			text: options.text,
			type: "warning",
			showCancelButton: true,
			confirmButtonClass: "btn-danger",
			confirmButtonText: "Yes, remove it",
			cancelButtonText: "Cancel",
			closeOnConfirm: false,
			closeOnCancel: false
		},
		function(isConfirm) {
			if (isConfirm) {
				swal({
					title: "Deleted!",
					text: "Your imaginary file has been deleted.",
					type: "success",
					confirmButtonClass: "btn-success"
				});
			} else {
				swal({
					title: "Cancelled",
					text: "Your imaginary file is safe :)",
					type: "error",
					confirmButtonClass: "btn-danger"
				});
			}
		});
}

function _showAlert(customOptions) {
	//Creation example
	//_showAlert({
	//    showTo (prependTo): "#mainContentArea",
	//    showTo (prependTo): $("#mainContentArea"),
	//    showToElTop (before): $("#mainContentArea"),
	//    type: 'error',
	//    title: "Message"
	//    text: "Please select at least one row",
	//    onReady: function($alert){}
	//    animateScrollTop: false
	//});

	//Default Options.
	var options = {
		showTo: ".panel-body",
		animateScrollTop: false,
		title: "Mensaje",
		text: "Mensaje al usuario",
		type: "info"
	};

	// Merge customOptions into options recursive
	$.extend(true, options, customOptions);

	var strAlert =
		//'<div style="clear:both;"></div>                                                                ' +
		'<div class="alert alert-' + options['type'].toLowerCase() + ' alert-dismissible fade in"> ' +
		'    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> ' +
		'    <strong>:ptitle</strong> ' +
		'    <p>:ptext</p> ' +
		'</div>',
		className;

	//Crear el mensaje.
	strAlert = strAlert.replace(":ptitle", options["title"] ? options["title"] : 'Alerta');
	strAlert = strAlert.replace(":ptext", options["text"] ? options["text"] : '[Empty message]');

	if (options["showToElTop"]) {
		var $showToElTop = options["showToElTop"];

		//Remover si existe algun mensaje en el elemento.
		$showToElTop.find(".alert").remove();

		//Agregar el mensaje.

		var htmlAlert = $(strAlert).hide();

		$showToElTop.before(htmlAlert);

		htmlAlert.fadeIn(100, function() {
			if (options["onReady"]) {
				options["onReady"](htmlAlert);
			}
		});
	} else {
		if (options["showTo"]) {

			var $elShowto;

			if (typeof options["showTo"] == "object") {
				$elShowto = options["showTo"];
			} else {
				$elShowto = $(options["showTo"]);
			}

			//Remover si existe algun mensaje en el elemento.
			$elShowto.find(".alert").remove();

			//Agregar el mensaje
			var htmlAlert = $(strAlert).hide().prependTo($elShowto);

			htmlAlert.fadeIn(100, function() {
				if (options["onReady"]) {
					options["onReady"](htmlAlert);
				}
			});
		}
	}

	if (options['animateScrollTop'] === true) {
		//Subimos el Scroll de la pagina para mostrar el mensaje.
		$('html, body').animate({
			scrollTop: '0px'
		}, 800);
	}
}

function _showModal(customOptions) {
	//Creation example
	//_showModal({
	//      id: "modalFormNewItem",
	//      width: "98%",
	//      buttons: [{
	//          name: "Confirm",
	//          class: "btn-danger",
	//          closeModalOnClick: true,
	//          onClick: function ($modal) {
	//              console.log($modal);
	//          }
	//      }],
	//      addCloseButton: true,
	//      title: "Modal Tittle",
	//      size: "" // modal-size-small : modal-size-large : modal-size-full
	//      contentHtml: "Body goes here...", // $(".html")
	//      contentAjaxUrl: "",
	//      contentAjaxParams: {},
	//      contentAjaxType: "GET",
	//      loadingMsg: "Getting form information...",
	//      loadingMsgType: "fullLoading" // fullLoading : notification : topBar : alert,
	//      onReady: function(){},
	//      onClose: function(){}
	//});

	//Default Options.
	var options = {
		width: "98%",
		buttons: [],
		addCloseButton: false,
		title: "Modal Tittle",
		size: "",
		contentHtml: "Body goes here...",
		contentAjaxUrl: "",
		contentAjaxParams: {},
		contentAjaxType: "GET",
		loadingMsg: "Loading...",
		loadingMsgType: "fullLoading"
	};

	if (options == null) {
		options = {};
	}
	//Hacer un merge con las opciones que nos enviaron y las default.
	$.extend(true, options, customOptions);

	function createModal(options) {
		var idModal = options["id"] ? options["id"] : _createCustomID();
		var idContainerModal = "containerModal-" + idModal;
		var idBtnOpenModal = "btnOpenModal-" + idModal;
		var idTempLinkOpenModal = "btnOpenModal-" + idModal;
		var classCloseModal = "close-modal";
		var idBtnConfirmModal = "btnConfirmModal-" + idModal;

		options["width"] = (options["size"] ? "" : options["width"]);
		var htmlModal =
			'<div id="' + idContainerModal + '" > ' +
			'    <button type="button" id="' + idTempLinkOpenModal + '" class="btn btn-default margin-inline" data-toggle="modal" data-target="#modal-' + idModal + '" style="display:none;">Modal ' + idModal + '</button> ' +
			'    <div class="modal fade ' + (options.size ? options.size : '') + '" id="modal-' + idModal + '" tabindex="-1" role="dialog" aria-hidden="true" > ' +
			'        <div class="modal-dialog" role="document" ' + (options.width ? ('style="width: ' + options.width + ';"') : '') + ' > ' +
			'            <div class="modal-content"> ' +
			'                <div class="modal-header"> ' +
			'                    <button type="button" class="close ' + classCloseModal + '" aria-hidden="true"><span aria-hidden="true">&times;</span></button> ' +
			'                    <h4 class="modal-title">:pmodalTitle</h4> ' +
			'                </div> ' +
			'                <div class="modal-body"></div> ' +
			'                <div class="modal-footer"> ';

		//Add default close modal button
		if (options.addCloseButton) {
			htmlModal += '      <button class="btn ' + classCloseModal + '" type="button">Close</button>';
		}

		//Create buttons
		for (var i = 0; i < options.buttons.length; i++) {
			var button = options.buttons[i];

			//Set close modal on click button default
			if (typeof button.closeModalOnClick == "undefined") {
				button.closeModalOnClick = true;
			}

			button.id = idModal + "_btn_" + i;
			htmlModal += '      <button id="' + button.id + '" class="btn ' + button['class'] + ' ' + (button.closeModalOnClick ? classCloseModal : '') + '" type="button">' + button.name + '</button>';
		}

		htmlModal +=
			'                </div> ' +
			'            </div> ' +
			'        </div> ' +
			'    </div> ' +
			'</div> ';

		//Crear el mensaje.
		htmlModal = htmlModal.replace(":pmodalTitle", options["title"]);
		htmlModal = htmlModal.replace(":pmodalBody", options["contentHtml"]);

		//Remove if exists modal
		$("#" + idContainerModal).remove();

		//Show confirmation modal.
		var $modal = $(htmlModal);

		//Add contentHtml
		$modal.find(".modal-body").append(options["contentHtml"]);
		$modal.find(".modal-body").append('<div style="clear:both;"></div>');

		$('body').append($modal);

		//On Open Modal
		$("#" + idBtnOpenModal).click(function() {
			if (options["onReady"]) {
				options["onReady"]($modal.find('.modal-content'));
			}
			//console.log('opening modal #' + idContainerModal);
		});

		//On click buttons
		for (var i = 0; i < options.buttons.length; i++) {
			addEventButton(i);
		}

		//Add event to button
		function addEventButton(index) {
			//Create new reference by each index to send in the function
			var tempIndex = index;

			$("#" + options.buttons[tempIndex].id).click(function() {
				if (options.buttons[tempIndex].onClick) {
					options.buttons[tempIndex].onClick($modal.find('.modal-content'));
				}
				//console.log('confirm modal #' + idContainerModal);
				//$modal.remove();
			});
		};

		//On Close Modal
		//$modal.find("." + classCloseModal + ",[data-dismiss='modal']").click(function() {
		$modal.find("." + classCloseModal).click(function() {
			if (options["onClose"]) {
				options["onClose"]($modal.find('.modal-content'));
			}
			var $backdrop = $(".modal-backdrop");
			if($backdrop.length > 0){
				$backdrop = $($backdrop[0]);
			}
			
			$backdrop.fadeOut(300, function(){
				$(this).remove();
			});
			$modal.remove();
			
			//Fix boostrap modal scroll error
			$("body").removeClass("modal-open");
		});

		$("#" + idBtnOpenModal).click();
	}

	//Validate if we need to load an url
	if (options.contentAjaxUrl) {
		_callServer({
			loadingMsgType: options.loadingMsgType,
			loadingMsg: options.loadingMsg,
			url: options.contentAjaxUrl,
			data: options.contentAjaxParams,
			type: options.contentAjaxType,
			onSuccess: function(response) {
				options.contentHtml = response;
				createModal(options);
			}
		});
	} else {
		createModal(options);
	}
}

function _createEditor(customOptions) {
	var options = {
		mode: "modal",						// modal : inline : popup : generate-form
		modalSize: "modal-size-large",		// modal-size-small : modal-size-large : modal-size-default : modal-size-full
		align: "vertical",					// vertical : horizontal NOTE(Jquery validate is only working with horizontal)
		title: "Information",
		labelSize: "col-md-3",				// Used only when align is horizontal
		controlSize: "col-md-9",			// Used only when align is horizontal
		iconTitle: "icmn-equalizer3",
		tabs: [],
		tabsAlign: "horizontal",			// vertical : horizontal
		fields: {},
		onlyChanges: true,
		onSave: function() {}
	};

	// Merge customOptions into options recursive
	$.extend(true, options, customOptions);

	// Merge customFields into fields
	options.fields = options.fields.map(customField => mergeFieldWithDefault(customField) );

	switch (options.mode) {
		case "modal":
			showFormModal();
			break;
			
		case "generate-form":
			var $contentForm = $("<div></div>");
			var $btnClose = $('<button class="btn pull-right" type="button">Close</button>');
			var $btnSave = $('<button class="btn btn-success pull-right" type="button">Save Changes</button>');
			var $divClear = $('<div style="clear:both;"></div>');
			var $form = getForm();
			
			$contentForm.append($form);
			
			//Add Close button
			//$contentForm.append($btnClose);
			
			//Add Save button
			$btnSave.click(function(){
				onSave();
			});
			$contentForm.append($btnSave);
			
			//Add clear div to avoid style issues
			$contentForm.append($divClear);
			
			return $contentForm;
			break;
	}

	function showFormModal(){
		var $form = getForm();

	    if(_isMobilLayout()){
	        options.modalSize = "modal-size-full";
	    }

		_showModal({
			size: options.modalSize,
			contentHtml: $form,
			title: '<i class="' + options.iconTitle + ' "></i> ' + options.title,
			addCloseButton: true,
			buttons: [{
				name: "Save Changes",
				class: "btn-success",
				closeModalOnClick: false,
				onClick: function($modal) {
					 onSave($modal);
				}
			}]
		});
	}
	
	function onSave($modal) {
		//alert("Saving changes...");
		var $form = options.$form;
		var changes = [];
		var fieldsChanged = [];
	
		for (var i = 0; i < options.fields.length; i++) {
			var objField = options.fields[i];
			var idField = "field-" + objField.id;
	
			//Save only if has changes
			if ($form.find("#" + idField).attr("has-changes") == "1" || !options.onlyChanges) {
				var fieldValue = $("#" + idField).val();
	
				if (objField.type == "radio") {
					fieldValue = $form.find("[name='field-" + objField.id + "']:checked").val();
				}
	
				fieldsChanged.push(objField.id);
				changes.push({
					"id": objField.id,
					"oldValue": $form.find("#" + idField).attr("old-value"),
					"newValue": fieldValue
				});
			}
		}
	
		//Send changes
		if (options.onSave && (!$form.attr("novalidate") || ($form.attr("novalidate") && $form.valid()))) {
			options.onSave({
				fieldsChanged: fieldsChanged,
				changes: changes
			});
	
			//Close Modal
			if($modal){
				$modal.find(".close-modal").click();	
			}
		} else {
			_showNotification({
				text: "Please review the errors.",
				type: "danger"
			});
		}
	}
	
	function getForm() {
		var $form = $("<form></form>");
		var validateRules = {};
		var tabsInfo = {};
		//Add tabs to the form
		if (options.tabs.length > 0) {
			var classTabsAlign = "nav-tabs-vertical";
			var tabsInfo = {};

			//Add default tab "Other"
			options.tabs.push({
				id: "tab-other",
				icon: "icmn-sphere",
				name: "Others"
			});

			for (var i = 0; i < options.tabs.length; i++) {
				var objTab = options.tabs[i];
				tabsInfo[objTab.id] = {
					isAdded: false,
					cantFields: 0,
					$tab: $(
						'<li class="nav-item" idTab="' + objTab.id + '"> ' +
						'    <a class="nav-link" href="javascript: void(0);" data-toggle="tab" data-target="#' + objTab.id + '" role="tab" aria-expanded="true"> ' +
						'        <i class="' + objTab.icon + '"></i> ' + objTab.text +
						'</a> ' +
						'</li> '
					),
					$tabContent: $(
						'<div class="tab-pane" id="' + objTab.id + '" role="tabpanel" aria-expanded="true"></div>'
					),
					fnOnClick: []
				};

				//On Click Events to load init codemirrow
				tabsInfo[objTab.id].$tab.click(function() {
					if ($(this).attr("clickEventsFired") != "1") {
						var idTab = $(this).attr("idTab");
						for (var k = 0; k < tabsInfo[idTab].fnOnClick.length; k++) {
							tabsInfo[idTab].fnOnClick[k]();
						}
						$(this).attr("clickEventsFired", "1");
					}
				});
			}

			if (options.tabsAlign == "horizontal") {
				classTabsAlign = "nav-tabs-horizontal";
			}

			var $tabHtml = $(
				'<div class="' + classTabsAlign + '"> ' +
				'    <ul class="nav nav-tabs" role="tablist"></ul> ' +
				'    <div class="tab-content padding-vertical-10"></div> ' +
				'</div> '
			);

			$form.append($tabHtml);
		}

		for (var i = 0; i < options.fields.length; i++) {
			var objField = options.fields[i];
			var $contentFieldHtml = getContentFieldHtml(objField);
			objField.$contentFieldHtml = $contentFieldHtml;
			
			//Add to tabs
			if (options.tabs.length > 0) {
				tabsInfo[objField.idTab].cantFields++;
				tabsInfo[objField.idTab].$tabContent.append($contentFieldHtml);

				if (tabsInfo[objField.idTab].isAdded == false) {
					$form.find(".nav-tabs").append(tabsInfo[objField.idTab].$tab);
					$form.find(".tab-content").append(tabsInfo[objField.idTab].$tabContent);

					if (objField.fnInit) {
						tabsInfo[objField.idTab].fnOnClick.push(objField.fnInit);
					}

					tabsInfo[objField.idTab].isAdded = true;
				}
			} else {
				$form.append($contentFieldHtml);
				if (objField.fnInit) {
					objField.fnInit();
				}
			}

			//Add validate rule only if exists
			if (objField.validate) {
				if(typeof objField.validate.required == "boolean"){
					//Add depends only if the field is visible
					objField.validate.required = {
						depends: function(e){
							return $(e).closest(".content-field").css("display") != "none";
						}
					};
				}
				validateRules['field-' + objField.id] = objField.validate;
			}
		}

		//Set first tab as Active
		$form.find(".nav-tabs li a").first().addClass("active");
		$form.find(".tab-content .tab-pane").first().addClass("active");

		//Load events of first tab
		$form.find(".nav-tabs li").first().click();

		//Add Jquery Validate
		_validateForm({
			form: $form,
			rules: validateRules,
			align: options.align
		});
		
		//Set $form to options
		options.$form = $form;
		
		//Hide fields if it is necesary
		hideOrShowFields();
		
		return $form;
	}

	function getContentFieldHtml(objField) {
		var $contentFieldHtml;

		switch (objField.align || options.align) {
			case "horizontal":
				$contentFieldHtml = $(
					'<div class="form-group row content-field"> ' +
					'    <div class="' + options.labelSize + '"> ' +
					'        <label class="form-control-label" for="field-' + objField.id + '">' + objField.text + '</label> ' +
					'    </div> ' +
					'    <div class="' + options.controlSize + ' field"></div> ' +
					'</div> '
				);
				break;

			case "vertical":
				$contentFieldHtml = $(
					'<div class="row content-field"> ' +
					'    <div class="col-md-12"> ' +
					'        <div class="form-group field"> ' +
					'            <label class="col-md-12" for="field-' + objField.id + '">' + objField.text + '</label> ' +
					'        </div> ' +
					'    </div> ' +
					'</div> '
				);
				break;
		}

		var $fieldHtml = getFieldHtml(objField);

		//Add field html
		$contentFieldHtml.find(".field").append($fieldHtml);

		return $contentFieldHtml;
	}

	function getFieldHtml(objField) {
		var $fieldHtml;

		switch (objField.type) {
			case "radio":
				$fieldHtml = getFieldHtmlRadio(objField);
				break;

			case "input":
				$fieldHtml = getFieldHtmlInput(objField);
				break;

			case "input-group":
				$fieldHtml = getFieldHtmlInputGroup(objField);
				break;

			case "textarea":
				$fieldHtml = getFieldHtmlTextarea(objField);
				break;

			case "codemirrow-js":
				$fieldHtml = getFieldHtmlCodemirror(objField, "js");
				break;

			case "codemirrow-css":
				$fieldHtml = getFieldHtmlCodemirror(objField, "css");
				break;

			case "codemirrow-html":
				$fieldHtml = getFieldHtmlCodemirror(objField, "html");
				break;
		}

		//Add changes tranking
		var $fieldToBindEvent = ($fieldHtml.find("#field-" + objField.id).length > 0) ? $fieldHtml.find("#field-" + objField.id) : $fieldHtml;
		$fieldToBindEvent.change(function() {
			var $el = $(this);
			var fieldValue = $el.val();

			if (objField.type == "radio") {
				fieldValue = $("[name='field-" + objField.id + "']:checked").val();
				
				//Fire Jquery Validate
				$("[name='field-" + objField.id + "']").keyup();
			}

			if ($el.attr("old-value") != fieldValue) {
				$el.attr("has-changes", "1");
			} else {
				$el.attr("has-changes", "0");
			}
		
			//Validate if it is necessary hide or show fields by new value
			hideOrShowFields();

			console.log("#field-" + objField.id, " has-changes:" + $el.attr("has-changes"));
		});

		return $fieldHtml;
	}

	function getFieldHtmlRadio(objField) {
		var $fieldHtml = $(
			'<div class="btn-group" data-toggle="buttons" old-value="' + objField.value + '" id="field-' + objField.id + '"></div> '
		);

		var optionHasChangeByDefault = false;
		for (var i = 0; i < objField.options.length; i++) {
			//Default Values
			var objOption = {
				color: "btn-default-outline",
				value: "",
				text: "",
				isChecked: "",
				isDefault: false
			};

			// Merge objOptionCustom into objOption recursive
			$.extend(true, objOption, objField.options[i]);

			//Selected option
			if (objField.value == objOption.value) {
				objOption.color += " active";
				objOption.isChecked = "checked=true";
			}
			
			//Validate select default option only if we don't have pre selected value
			if(!objField.value && objOption.isDefault){
				objOption.color += " active";
				objOption.isChecked = "checked=true";
				optionHasChangeByDefault = true;
			}

			var $option = $(
				'<label class="btn ' + objOption.color + '"> ' +
				'    <input type="radio" ' + objOption.isChecked + ' value="' + objOption.value + '" name="field-' + objField.id + '" id="field-option-' + i + '"> ' + objOption.text +
				'</label> '
			);

			$fieldHtml.append($option);
		}

		if(optionHasChangeByDefault){
			$fieldHtml.attr("has-changes", "1");
		}

		return $fieldHtml;
	}

	function getFieldHtmlInput(objField) {
		var $fieldHtml = $(
			'<input type="text" class="form-control ' + (objField.style.isRounded ? 'form-control-rounded' : '') + '" old-value="' + objField.value + '" value="' + objField.value + '" placeholder="' + objField.placeholder + '" name="field-' + objField.id + '" id="field-' + objField.id + '">'
		);
		return $fieldHtml;
	}

	function getFieldHtmlInputGroup(objField) {
		var $fieldHtml = $(
			'<div class="input-group"> ' +
			'    <input type="text" class="form-control ' + (objField.style.isRounded ? 'form-control-rounded' : '') + '" old-value="' + objField.value + '" value="' + objField.value + '" placeholder="' + objField.placeholder + '" name="field-' + objField.id + '" id="field-' + objField.id + '">' +
			'    <span class="input-group-addon" style="cursor:pointer;" onclick="var $el = $(\'#field-' + objField.id + '\'); $el.val(\'\').focus(); $el.keyup(); $el.change();">' +
			'        <i class="icmn-clear-formatting" ></i>' +
			'    </span>' +
			'</div>'
		);
		return $fieldHtml;
	}

	function getFieldHtmlTextarea(objField) {
		var $fieldHtml = $(
			'<textarea class="form-control" rows="3" name="field-' + objField.id + '" id="field-' + objField.id + '" ></textarea> '
		);
		$fieldHtml.attr("old-value", objField.value);
		$fieldHtml.text(objField.value);

		return $fieldHtml;
	}

	function getFieldHtmlCodemirror(objField, codeMode) {
		var $fieldHtml = $(
			'<textarea class="form-control codemirrow-' + codeMode + '" rows="3" name="field-' + objField.id + '" id="field-' + objField.id + '" ></textarea> '
		);
		$fieldHtml.attr("old-value", objField.value);
		$fieldHtml.text(objField.value);
		objField.fnInit = function() {
			_execOnObjectShows(".codemirrow-" + codeMode, function() {
				_initCodemirror();
			}, 3);
		}

		return $fieldHtml;
	}

	function mergeFieldWithDefault(objCustomField) {
		var objField = {
			type: "input",
			placeholder: "Edit...",
			style: {
				isRounded: false
			},
			value: "",
			idTab: "tab-other",
			align: "",
			options: [],
			show: true
		};

		// Merge objCustomField into objField recursive
		$.extend(true, objField, objCustomField);

		return objField;
	}
	
	function hideOrShowFields(){
		//Hide or Show Fields
		options.fields.forEach(objField => {
			if (showField(objField)) {
				objField.$contentFieldHtml.css("display", "");
			}else{
				objField.$contentFieldHtml.css("display", "none");
			}
		});
		
		//Validate if need to hide or show tabs
		if (options.tabs.length > 0) {
			options.tabs.forEach(objTab => {
				var $tabContent = options.$form.find("#" + objTab.id);
			
				//Hide if the content only have 1 field
				// ECMAScript 6
				var cantVisibleFields = ($tabContent.find(".content-field").filter((index, div) => $(div).css("display") != "none")).length;
				
				// ECMAScript 5
				// var cantVisibleFields = $tabContent.find(".content-field").filter(function(index){ 
				// 	console.log(index, $(this), $(this).css("display")); 
				// 	return $(this).css("display") != "none";
				// });
				
				var idTab = $tabContent.attr("id");
				var $tab = options.$form.find("[idTab='" + idTab + "']");
					
				//Hide tab is it not have visible fields
				if(cantVisibleFields == 0){	
					$tabContent.css("display", "none");
					$tab.css("display", "none");
				}else{
					$tabContent.css("display", "");
					$tab.css("display", "");
				}
			});
		}
	}
	
	function showField(objField){
		if(typeof objField.show == "boolean"){
			return objField.show;
		}else{
			return objField.show(getData());
		}
	}
	
	function getData(){
		var data = {};
		var $form = options.$form;
		
		for (var i = 0; i < options.fields.length; i++) {
			var objField = options.fields[i];
			var idField = "field-" + objField.id;
			var fieldValue = $form.find("#" + idField).val();

			if (objField.type == "radio") {
				fieldValue = $form.find("[name='field-" + objField.id + "']:checked").val();
			}

			data[objField.id] = fieldValue;
		}
		return data;
	}
}

//Init plugins Functions
//--------------------------------------------------------------------------
function _initCodemirror() {
	$(".codemirrow-css,.codemirrow-js,.codemirrow-html").each(function() {
		var $el = $(this);
		var mode = "";

		if ($el.hasClass("codemirrow-css")) {
			mode = "css";
		}

		if ($el.hasClass("codemirrow-js")) {
			mode = "javascript";
		}

		if ($el.hasClass("codemirrow-html")) {
			mode = "xml";
		}

		if (!$el.next().hasClass("CodeMirror") && $($el).is(':visible')) {

			var editor = CodeMirror.fromTextArea($el[0], {
				mode: mode,
				indentWithTabs: true,
				smartIndent: true,
				lineNumbers: true,
				matchBrackets: true,
				theme: 'ambiance',
				autofocus: false
			});

			editor.on("blur", function() {
				editor.save();
			});

			editor.on("change", function(cm, change) {
				$(cm.getTextArea()).val(cm.getValue());
				$(cm.getTextArea()).text(cm.getValue());
				$(cm.getTextArea()).change();
				$(cm.getTextArea()).keyup();
			});
		}
	});
}

//Util Functions
//--------------------------------------------------------------------------
function _validateForm(customOptions) {
	var options = {
		form: {},
		rules: [],
		align: "vertical",
		positionError: "tooltip" //underElement: tooltip
	};

	if (typeof customOptions.form == "string") {
		customOptions.form = $("#" + customOptions.form);
	}

	// Merge customOptions into options recursive
	$.extend(true, options, customOptions);

	//Add Jquery Validate
	options.form.validate({
		focusInvalid: false,
		ignore: "",
		rules: options.rules,

		invalidHandler: function(event, validator) {
			//display error alert on form submit    
		},

		errorPlacement: function(label, element) { // render error placement for each input type   
			var $formControl = $(element);
			var $formGroup = $formControl.closest(".form-group");
			var $formControlContent = $formControl.closest(".field");
			
			var $label = $(label);
			var $contentErrorLabel = $('<span class="error"><ul style="margin: 0px;padding: 0px;"><li></li></ul></span>');

			switch (options.positionError) {
				case 'underElement':
					$contentErrorLabel.addClass("form-control-error-list");
					break;
				case 'tooltip':
					$contentErrorLabel.addClass("form-control-error");
					break;
			}

			//Remove space of label
			$label.css("display", "block");
			$label.css("margin", "0px");

			$contentErrorLabel.css("z-index", "2");
			$formControlContent.append($contentErrorLabel);
			//$contentErrorLabel.insertAfter($formControlContent);
			$contentErrorLabel.find('li').append(label);

			switch (options.align) {
				case "horizontal":
					$formControl.addClass("form-control-danger");
					$formControl.removeClass("form-control-success");

					$formGroup.addClass("has-danger");
					$formGroup.removeClass("has-success");
					break;

				case "vertical":
					break;
			}

			showTabErrorsNumber();
		},

		highlight: function(element) { // hightlight error inputs
			var $formControl = $(element);
			var $formGroup = $formControl.closest(".form-group");
			var $formControlContent = $formControl.closest(".field");

			switch (options.align) {
				case "horizontal":
					$formControl.addClass("form-control-danger");
					$formControl.removeClass("form-control-success");
					
					//$formControl.parent().find(".form-control-error").hide();
					$formControlContent.find(".error").hide();

					$formGroup.addClass("has-danger");
					$formGroup.removeClass("has-success");
					break;

				case "vertical":
					break;
			}

			showTabErrorsNumber();
		},

		unhighlight: function(element) { // revert the change done by hightlight
			var $formControl = $(element);
			var $formGroup = $formControl.closest(".form-group");
			var $formControlContent = $formControl.closest(".field");

			switch (options.align) {
				case "horizontal":
					$formControl.removeClass("form-control-danger");
					$formControl.addClass("form-control-success");
					
					//$formControl.parent().find(".form-control-error").hide();
					$formControlContent.find(".error").hide();

					$formGroup.removeClass("has-danger");
					$formGroup.addClass("has-success");
					break;

				case "vertical":
					break;
			}

			showTabErrorsNumber();
		},

		success: function(label, element) {
			var $formControl = $(element);
			var $formGroup = $formControl.closest(".form-group");
			var $formControlContent = $formControl.closest(".field");

			switch (options.align) {
				case "horizontal":
					$formControl.removeClass("form-control-danger");
					$formControl.addClass("form-control-success");
					
					//$formControl.parent().find(".form-control-error").hide();
					$formControlContent.find(".error").hide();

					$formGroup.removeClass("has-danger");
					$formGroup.addClass("has-success");
					break;

				case "vertical":
					break;
			}

			showTabErrorsNumber();
		},

		submitHandler: function(form) {
			_consoleLog({
				fn: "submitHandler",
				form: form
			});
		}
	});

	function showTabErrorsNumber() {
		//Add summary to tabs
		options.form.find(".tab-pane").each(function() {
			var $tabPane = $(this);
			var idContent = $tabPane.attr("id");
			var $a = $("[data-target='#" + idContent + "']");
			var cantErrors = $tabPane.find(".form-control-danger").length;
			var existsErrorsInTab = ($a.find(".tab-errors").length > 0);

			if (cantErrors > 0) {
				if (existsErrorsInTab) {
					$a.find(".tab-errors").html("(" + cantErrors + ")");
				} else {
					$a.html($a.html() + " <span class='color-danger tab-errors'>(" + cantErrors + ")</span>");
				}
			} else {
				$a.find(".tab-errors").remove();
			}
		});
	}
}

function _toJSON(pobject) {
	function stringify(obj, replacer, spaces, cycleReplacer) {
		return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
	}

	function serializer(replacer, cycleReplacer) {
		var stack = [],
			keys = []

		if (cycleReplacer == null) cycleReplacer = function(key, value) {
			if (stack[0] === value) return "[Circular ~]"
			return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
		}

		return function(key, value) {
			if (stack.length > 0) {
				var thisPos = stack.indexOf(this);

				if (~thisPos) {
					stack.splice(thisPos + 1);
				} else {
					stack.push(this);
				}

				if (~thisPos) {
					keys.splice(thisPos, Infinity, key);

				} else {

					keys.push(key);
				}


				if (~stack.indexOf(value)) {
					value = cycleReplacer.call(this, key, value);
				}
			} else {
				stack.push(value);
			}

			return replacer == null ? value : replacer.call(this, key, value)
		}
	}
	var separetor = 2; //"\t";
	var result = stringify(pobject, null, separetor);

	return result;
}

function _parseJSON(str) {
	if (str) {
		return JSON.parse(str);
	} else {
		return null;
	}
}

function _isSupportedBrowser() {
	var support = false;
	if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		support = true;
	}

	//Conditional comments only work in IE, and are thus excellently suited to 
	//give special instructions meant only for IE. They are supported from IE 5 
	//up until IE9 (inclusive).

	//html clases: lessIE7, IE7, IE8, IE9, upIE9
	if ($('html').is('.IE9') || $('html').is('.upIE9')) {
		support = true;
	}
	return support;
}

function _frwkGetWebServiceUrl() {
	var port = '';
	var urlBase = '';
	var c9Url = 'https://jsadmin-framework-krlosnando.c9users.io:8081';
	var codeanywhereUrl = 'https://ubuntu-server-cdominguez.codeanyapp.com';
	
	if (window.location.port) {
		port = ':' + window.location.port;
	}

	//Cuando se esta utilizando "ionic serve" en el  repositorio "monenfy-cordova" este va a utilizar el puerto 8100 localmente,
	//asi que hay que correr node server.js del repositorio "monenfy-webservice" y utilizar el puerto ":5000" para traer los datos.
	if (window.location.port == "8100") {
		port = ':5000';
	}

	//Cuando corre desde el celular
	if (_contains(window.location.protocol, "file")) {
		//Celular
		//urlBase = 'http://monenfy-prod.herokuapp.com';
		//urlBase = 'http://prod-monenfy.rhcloud.com';
		urlBase = c9Url;
	}

	if (window.location.hostname == "localhost") {
		//Localmente
		urlBase = c9Url;

	} else {

		//Heroku
		//Cloud9
		urlBase = window.location.protocol + '//' + window.location.hostname + port;
	}

	return urlBase;
}

function _getServerUrl(){
	var globalConfig = _frwkGetConfigFile("globalConfig");
	return globalConfig.serverUrl;
}

function _callServer(customOptions) {
	var options = {
		loadingMsgType: "topBar",
		loadingMsg: "Loading...",
		method: "GET",
		params: {},
		data: {},
		onSuccess: function() {

		}
	};

	// Merge customOptions into options recursive
	$.extend(true, options, customOptions);

	var req = {
		method: options.method,
		url: _getServerUrl() + options.url,
		data: options.data
	}

	var fnOnSuccess = function(response) {
		if (options.onSuccess) {
			options.onSuccess(response);
		}
		if (options.loadingMsgType == "topBar") {
			_hideTopBarLoading();
		}
	};
	var fnOnError = function(xhr, textStatus, thrownError) {
		var mensaje = "";
		mensaje = '<pre><b>Ajax Config:</b> ' + _htmlEscape(_toJSON(req)) + '</pre><pre><b>Data Response:</b> ' + _htmlEscape(xhr['responseText']) + '</pre>';

		// if (status === 0) {
		//     mensaje = '<div class="monenfy-no-internet-container"><pre>Monenfy ha detectado que no tienes accesso a internet ó el servidor no esta disponible. </pre> <br> <pre>Revisa tu conexión de internet y vuelve a intentar más tarde.</pre> <br> <div class="monenfy-icon-big-container"><i class="icon monenfy-icon-big monenfy-icon-internet" style="color: green;"></i></div><div class="monenfy-icon-big-container"><i class="icon monenfy-icon-big monenfy-icon-too-sad" style="color: green;"></i></div></div>';
		// } else {
		//     mensaje = '<div class="monenfy-no-internet-container"><pre>Monenfy ha detectado un error en la aplicación. </pre> <br><pre>Si necesitas ayuda puedes contactar a Carlos Dominguez (krlosnando@gmail.com). </pre> <br> <div class="monenfy-icon-big-container"><i class="icon monenfy-icon-big monenfy-icon-too-sad" style="color: green;"></i></div></div> <br><pre> <b>Data Response:</b> ' + data + '</pre> <br> <b>Json:</b> <pre>' + JSON.stringify(config) + '</pre>';
		// }

		_showAlert({
			type: 'danger',
			text: mensaje,
			animateScrollTop: true
		});

		if (options.loadingMsgType == "topBar") {
			_hideTopBarLoading();
		}

		console.log("xhr", xhr, "textStatus", textStatus, "thrownError", thrownError);
	};

	$.ajaxSetup({
		timeout: 120000
	});
	//Send server request
	$.ajax({
		url: req.url,
		data: req.data,
		beforeSend: function() {
			if (options.loadingMsgType == "topBar") {
				_showTopBarLoading({
					text: options.loadingMsg
				});
			}
			if (options.loadingMsgType == "notification") {
				_showNotification({
					text: options.loadingMsg
				});
			}
		},
		success: function(response) {
			fnOnSuccess(response);
		},
		error: function(xhr, textStatus, thrownError) {
			fnOnError(xhr, textStatus, thrownError);
		},
		type: req.method,
		timeout: 120000
	});
}

function _replaceAll(str, find, replace) {
	//return str.replace(new RegExp(find, 'g'), replace);
	return (str ? str.split(find).join(replace) : "");
}

function _contains(str, find) {
	var result = false;

	if (Object.prototype.toString.call(find) == '[object Array]') {
		for (var i = 0; i < find.length; i++) {
			if (str && str.indexOf(find[i]) !== -1) {
				result = true;
				break;
			}
		}
	} else {
		result = (str && str.indexOf(find) !== -1);
	}

	return result;
}

function _createCustomID() {
	var myDate = new Date();
	var id = "";
	id += myDate.getFullYear();
	id += (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
	id += myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
	id += myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
	id += myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
	id += myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();
	return id;
}

function _findObjByProperty(array, property, value) {
	var resultObj = null;
	var list = $.grep(array, function(n, i) {
		return n[property] == value;
	});

	if (list.length > 0) {
		resultObj = list[0];
	}
	return resultObj;
}

function _getBindEvends($el) {
	var events = null;
	if ($el.length > 0) {
		events = $._data($el[0], "events");
	}
	return events;
}

function _elementToObject(element, o) {
	var el = $(element);
	var o = {
		tagName: el.tagName
	};

	for (var i = 0;
		((el.attributes) && (i < el.attributes.length)); i++) {
		o[el.attributes[i].name] = el.attributes[i].value;
	}

	if (el.childElements && el.childElements().length) {
		var children = el.childElements();

		o.children = [];
		for (var i = 0; i < children.length; i++) {
			var child = $(children[i]);
			o.children[i] = _elementToObject(child, o.children);
		}
	}
	return o;
}

function _execOnObjectShows(pselector, pfn, psecondsToTry) {
	//Set default seconds to wait to 10 
	var seconds = 3;
	var checkEvery = 0.1;
	var counterSecsWaintig = 0;
	var isJquerySelector = true;
	if (psecondsToTry) {
		seconds = psecondsToTry;
	}

	//Create function to validate if exists the jquery selector or the window's var
	var existsObject;

	if (pselector && typeof(pselector) == 'string') {
		//Validate if needs to check a var or jquery selector
		if (_contains(pselector, "winvar_")) {
			pselector = pselector.replace("winvar_", "");
			isJquerySelector = false;
		}
		existsObject = function() {
			var exists = false;

			if (isJquerySelector) {
				//if ($(pselector).length > 0 && _elementInViewport($(pselector)[0])) {
				if ($(pselector).length > 0 && $(pselector).is(':visible')) {
					exists = true;
				}
			} else {
				if (window[pselector]) {
					exists = true;
				}
			}

			return exists;
		}
	} else {
		//Is a function
		existsObject = pselector;
	}
	//If exists selector run the function
	if (existsObject()) {
		if (pfn) {
			pfn();
		}
	} else {
		//Try to find the element each 2 second
		var checkElementIfShowInterval = setInterval(function() {
			console.log('_execOnObjectShows checking for: ' + pselector);

			//Check if the element exists
			if (existsObject()) {
				if (pfn) {
					pfn();
				}
				//_hideLoadingFullPage();
				clearInterval(checkElementIfShowInterval);
			} else {
				//Check for seconds to wait
				if (counterSecsWaintig > seconds) {
					clearInterval(checkElementIfShowInterval);
				}
			}

			counterSecsWaintig = counterSecsWaintig + checkEvery;
		}, (checkEvery * 1000)); //Miliseconds
	}
}

function _isMobilLayout() {
	return window.matchMedia('(max-width: 767px)').matches;
}

//JS Admin Functions
//--------------------------------------------------------------------------
function _initGlobal($Global) {
	$Global.fn.getApp() = {
		key: "admin",
		default: {
			menuOptions: [{
				"id": 7,
				"name": "Dashboard",
				"icon": "icmn-tree7",
				"path": "/",
				"linkedPage": "modules/dashboard.html",
				"js": "",
				"html": "",
				"css": "",
				"type": "menu-page",
				"numOrder": 0,
				"hasSeparator": "1"
			}, {
				"id": 4,
				"path": "/apps-manager",
				"name": "Apps Manager",
				"icon": "icmn-gamepad3",
				"linkedPage": "modules/app-manager/apps-manager.html",
				"js": "",
				"html": "",
				"css": "",
				"type": "menu-page",
				"numOrder": 1,
				"hasSeparator": "1"
			}, {
				"id": 6,
				"path": "/menu-option",
				"name": "Menu options",
				"icon": "icmn-menu2",
				"linkedPage": "modules/menu-option/menu-option.html",
				"js": "",
				"html": "",
				"css": "",
				"type": "menu-page",
				"numOrder": 2,
				"hasSeparator": "0"
			}, {
				"id": 2,
				"path": "/deploy",
				"name": "Deploy to mobile",
				"icon": "icmn-android",
				"linkedPage": "modules/deploy/deploy.html",
				"js": "",
				"html": "",
				"css": "",
				"type": "menu-page",
				"numOrder": 3
			}, {
				"id": 5,
				"path": "/resources",
				"name": "Resources",
				"icon": "icmn-stack2",
				"linkedPage": "modules/resources/resources.html",
				"js": "",
				"html": "",
				"css": "",
				"type": "menu-page",
				"numOrder": 4,
				"hasSeparator": "0"
			}, {
				"id": 3,
				"path": "/js-console",
				"name": "JS Console",
				"icon": "icmn-terminal",
				"linkedPage": "modules/js-console.html",
				"js": "",
				"html": "",
				"css": "",
				"type": "menu-page",
				"numOrder": 5,
				"hasSeparator": "0"
			}, {
				"id": 9,
				"name": "Global Config",
				"icon": "icmn-hammer-wrench",
				"path": "/app-config",
				"linkedPage": "modules/app-config/app-config.html",
				"js": "",
				"html": "",
				"css": "",
				"hasSeparator": "1",
				"type": "menu-page",
				"numOrder": 6
			}, {
				"id": 1,
				"path": "",
				"name": "Theme Settings",
				"icon": "icmn-cog util-spin-delayed-pseudo",
				"linkedPage": "",
				"js": "//@ sourceURL=modules/menu-option/theme-settings.js\n\n$(function() {\n    var body = $('body'),\n        themeColorClasses = 'theme-dark theme-default theme-blue theme-orange theme-red theme-green',\n        settingClasses = themeColorClasses + ' mode-superclean mode-default menu-fixed menu-static colorful-disabled colorful-enabled mode-box-shadow mode-box-shadow-disabled mode-squared mode-squared-disabled',\n        colorfulClasses = 'left-menu-list-color-primary left-menu-list-color-success left-menu-list-color-warning left-menu-list-color-danger left-menu-list-color-yellow';\n\n    // THEME COLOR\n    $('#options-theme .btn').on('click', function() {\n        $('#options-theme .active').removeClass('active');\n        var themeSelector = $(this).find('input').val();\n        body.removeClass(themeColorClasses).addClass(themeSelector);\n    });\n\n    // MODE SUPERCLEAN\n    $('#options-mode .btn').on('click', function() {\n        var themeSelector = $(this).find('input').val();\n        body.removeClass('mode-superclean mode-default').addClass(themeSelector);\n    });\n\n    // FIXED MENU\n    $('#options-menu .btn').on('click', function() {\n        var themeSelector = $(this).find('input').val();\n        body.removeClass('menu-fixed menu-static').addClass(themeSelector);\n    });\n\n    // BOX SHADOW\n    $('#mode-box-shadow .btn').on('click', function() {\n        var themeSelector = $(this).find('input').val();\n        body.removeClass('mode-box-shadow mode-box-shadow-disabled').addClass(themeSelector);\n    });\n\n    // SQUARED CORNERS\n    $('#mode-squared .btn').on('click', function() {\n        var themeSelector = $(this).find('input').val();\n        body.removeClass('mode-squared mode-squared-disabled').addClass(themeSelector);\n    });\n\n    // COLORFUL MENU\n    $('#options-colorful .btn').on('click', function() {\n        var themeSelector = $(this).find('input').val();\n        localStorage.setItem('options-colorful', themeSelector);\n        body.removeClass('colorful-disabled colorful-enabled').addClass(themeSelector);\n        $('nav.left-menu .left-menu-list-root > li').removeClass(colorfulClasses);\n        if (themeSelector == 'colorful-enabled') {\n            setTimeout(function() {\n                $('nav.left-menu .left-menu-list-root > li').each(function() {\n                    var classArray = colorfulClasses.split(' '),\n                        randomClass = classArray[Math.floor(Math.random() * classArray.length)];\n\n                    $(this).addClass(randomClass)\n                })\n            }, 200)\n        }\n    });\n\n    // SET SETTINGS DEPENDING ON BODY CLASSES\n    function setThemeSettings(arg) {\n        var classes = arg.split(\" \");\n        for (var j = 0; j < classes.length; j++) {\n            if (body.hasClass(classes[j])) {\n                $('.left-menu-block .btn input[value=' + classes[j] + ']').trigger('click');\n            }\n        }\n        return false;\n    }\n\n    setThemeSettings(settingClasses);\n});",
				"html": "<ul class=\"left-menu-list list-unstyled menu-html\">\n    <li>\n        <div class=\"left-menu-item\">\n            <div class=\"left-menu-block\">\n                <div class=\"left-menu-block-item\">\n                    <small>This menu gives possibility to construct custom blocks with any widgets, components and elements inside, like this theme settings</small>\n                </div>\n                <div class=\"left-menu-block-item\">\n                    <span class=\"font-weight-600\">Theme Style:</span>\n                </div>\n                <div class=\"left-menu-block-item\" id=\"options-theme\">\n                    <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default active\">\n                                <input type=\"radio\" name=\"options-theme\" value=\"theme-default\" autocomplete=\"off\" checked=\"\" /> Light\n                            </label>\n                        </div>\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default\">\n                                <input type=\"radio\" name=\"options-theme\" value=\"theme-dark\" autocomplete=\"off\" /> Dark\n                            </label>\n                        </div>\n                    </div>\n                    <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default\">\n                                <input type=\"radio\" name=\"options-theme\" value=\"theme-green\" autocomplete=\"off\" /> Green\n                            </label>\n                        </div>\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default\">\n                                <input type=\"radio\" name=\"options-theme\" value=\"theme-blue\" autocomplete=\"off\" /> Blue\n                            </label>\n                        </div>\n                    </div>\n                    <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default\">\n                                <input type=\"radio\" name=\"options-theme\" value=\"theme-red\" autocomplete=\"off\" /> Red\n                            </label>\n                        </div>\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default\">\n                                <input type=\"radio\" name=\"options-theme\" value=\"theme-orange\" autocomplete=\"off\" /> Orange\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"left-menu-block-item\">\n                    <span class=\"font-weight-600\">Fixed Top Menu:</span>\n                </div>\n                <div class=\"left-menu-block-item\" id=\"options-menu\">\n                    <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default active\">\n                                <input type=\"radio\" name=\"options-menu\" value=\"menu-fixed\" checked=\"\" /> On\n                            </label>\n                        </div>\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default\">\n                                <input type=\"radio\" name=\"options-menu\" value=\"menu-static\" /> Off\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"left-menu-block-item\">\n                    <span class=\"font-weight-600\">Super Clean Mode:</span>\n                </div>\n                <div class=\"left-menu-block-item\" id=\"options-mode\">\n                    <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default\">\n                                <input type=\"radio\" name=\"options-mode\" value=\"mode-superclean\" /> On\n                            </label>\n                        </div>\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default active\">\n                                <input type=\"radio\" name=\"options-mode\" value=\"mode-default\" checked=\"\" /> Off\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"left-menu-block-item\">\n                    <span class=\"font-weight-600\">Colorful Menu:</span>\n                </div>\n                <div class=\"left-menu-block-item\" id=\"options-colorful\">\n                    <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default active\">\n                                <input type=\"radio\" name=\"options-colorful\" value=\"colorful-enabled\" checked=\"\" /> On\n                            </label>\n                        </div>\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default\">\n                                <input type=\"radio\" name=\"options-colorful\" value=\"colorful-disabled\" /> Off\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"left-menu-block-item\">\n                    <span class=\"font-weight-600\">Menu Shadow:</span>\n                </div>\n                <div class=\"left-menu-block-item\" id=\"mode-box-shadow\">\n                    <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default\">\n                                <input type=\"radio\" name=\"mode-box-shadow\" value=\"mode-box-shadow\" /> On\n                            </label>\n                        </div>\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default active\">\n                                <input type=\"radio\" name=\"mode-box-shadow\" value=\"mode-box-shadow-disabled\" checked=\"\" /> Off\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"left-menu-block-item\">\n                    <span class=\"font-weight-600\">Squared Corners:</span>\n                </div>\n                <div class=\"left-menu-block-item\" id=\"mode-squared\">\n                    <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default\">\n                                <input type=\"radio\" name=\"mode-squared\" value=\"mode-squared\" /> On\n                            </label>\n                        </div>\n                        <div class=\"btn-group\">\n                            <label class=\"btn btn-default active\">\n                                <input type=\"radio\" name=\"mode-squared\" value=\"mode-squared-disabled\" checked=\"\" /> Off\n                            </label>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </li>\n</ul>",
				"css": "",
				"type": "menu-html",
				"numOrder": 7,
				"hasSeparator": "0"
			}, {
				"id": 8,
				"name": "Resport Test",
				"icon": "",
				"path": "",
				"linkedPage": "",
				"js": "//@ sourceURL=modules/menu-option/report-menu.js\n\n$(function() {\n    // CSS STYLING & ANIMATIONS\n    var cssAnimationData = {\n            labels: [\"S\", \"M\", \"T\", \"W\", \"T\", \"F\", \"S\"],\n            series: [\n                [11, 14, 16, 16, 20, 17, 21]\n            ]\n        },\n        cssAnimationOptions = {\n            fullWidth: !0,\n            chartPadding: {\n                right: 2,\n                left: 30\n            },\n            axisY: {\n                position: 'end'\n            }\n        },\n        cssAnimationResponsiveOptions = [\n            [{\n                axisX: {\n                    labelInterpolationFnc: function(value, index) {\n                        return index % 2 !== 0 ? !1 : value\n                    }\n                }\n            }]\n        ];\n\n    new Chartist.Line(\".example-left-menu-chart\", cssAnimationData, cssAnimationOptions, cssAnimationResponsiveOptions);\n});",
				"html": "<div class=\"example-left-menu-chart chartist-animated chartist-theme-dark\"></div>",
				"css": "",
				"type": "only-html",
				"hasSeparator": "1",
				"numOrder": 8
			}],
			globalConfig: {
				serverUrl: "https://jsadmin-framework-krlosnando.c9users.io:8081",
				filesVersion: "2017-01-28-v06"
			}
		}
	}

	$Global.fn.getApp().menuOptions = _frwkGetConfigFile("menuOptions");
	$Global.fn.getApp().globalConfig = _frwkGetConfigFile("globalConfig");

	$Global.getTemplateUrl = function(type, id) {
		var url = "template-" + type + "-" + id + ".html";

		console.log("$Global.getTemplateUrl => " + url);

		return url;
	};
}

function _frwkGetConfigFile(key){
    var localDataKey = localStorage.getItem(key);
    var dataKey;
    
    if(localDataKey){
        //Get local data
        dataKey = _parseJSON(localDataKey);
    }else{
        //Get from Server
        dataKey = $Global.fn.getApp().default[key];
    }
    
    return dataKey;
}
$(document).ready(function() {

	function ChatViewModel() {

		var that = this;

		that.userName = ko.observable('');
		that.chatContent = ko.observable('');
		that.message = ko.observable('');
		that.messageIndex = ko.observable(0);

		that.chatting = ko.observable(null);

		that.joinChat = function() {
			if (that.userName().trim() != '') {
				that.chatting(true);
                getMessages();
			}
		}

		function getMessages() {
			var form = $("#joinChatForm");
			$.ajax({url : form.attr("action"), type : "GET", data : {'messageIndex':0}, cache: false,
				success : function(messages) {
					for ( var i = 0; i < messages.length; i++) {
						that.chatContent(that.chatContent() + messages[i] + "\n");
						that.messageIndex(that.messageIndex() + 1);
					}
				},
				error : function(xhr) {
					if (xhr.statusText != "abort" && xhr.status != 503) {
						resetUI();
						console.error("Unable to retrieve chat messages. Chat ended.");
					}
				}
			});
			$('#message').focus();
		}

		that.postMessage = function() {
			if (that.message().trim() != '') {
				var form = $("#postMessageForm");
				$.ajax({url : form.attr("action"), type : "POST",
				  data : "message=[" + that.userName() + "] " + $("#postMessageForm input[name=message]").val(),
					error : function(xhr) {
						console.error("Error posting chat message: status=" + xhr.status + ", statusText=" + xhr.statusText);
					}
				});
				that.message('');
			}
		}

		that.leaveChat = function() {
			resetUI();
			this.userName('');
		}

		function resetUI() {
			that.chatting(null);
			that.message('');
			that.messageIndex(0);
			that.chatContent('');
		}
		
	}

	//Activate knockout.js
	ko.applyBindings(new ChatViewModel());

});



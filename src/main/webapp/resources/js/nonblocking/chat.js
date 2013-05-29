/*
 * JBoss, Home of Professional Open Source
 * Copyright 2013, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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



package org.springframework.samples.async.nonblocking.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.samples.async.data.ChatRepository;
import org.springframework.samples.async.server.SampleVerticle;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;
import org.vertx.java.core.Vertx;
import org.vertx.java.core.json.JsonObject;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
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
@Controller
@Profile("vertx")
@RequestMapping("/mvc/chat")
public class ChatControllerVertx {

	private final ChatRepository chatRepository;

	private final Map<DeferredResult<List<String>>, Integer> chatRequests =
			new ConcurrentHashMap<DeferredResult<List<String>>, Integer>();

    @Autowired
    private SampleVerticle verticle;

	@Autowired
	public ChatControllerVertx(ChatRepository chatRepository) {
		this.chatRepository = chatRepository;
	}

	@RequestMapping(method=RequestMethod.GET)
	@ResponseBody
	public List<String> getMessages(@RequestParam int messageIndex) {

		List<String> messages = this.chatRepository.getMessages(messageIndex);

		return messages;
	}


	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public void postMessage(@RequestParam String message) {

		this.chatRepository.addMessage(message);

        Map<String, Object> json = new HashMap<String, Object>();
        json.put("message", message);
        verticle.getVertx().eventBus().publish("test.app", new JsonObject(json));

	}

}

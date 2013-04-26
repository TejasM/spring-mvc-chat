package org.springframework.samples.async.server;

import org.springframework.stereotype.Component;
import org.vertx.java.core.Handler;
import org.vertx.java.core.Vertx;
import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.core.sockjs.SockJSServer;

/**
 * @author Tejas Mehta
 */
@Component
public class SampleVerticle {


    private EventBus eventBus;

    public void setup() {
        Vertx vertx = Vertx.newVertx();
        HttpServer server = vertx.createHttpServer();

        // Set security permission to let everything go through
        JsonArray permitted = new JsonArray();
        permitted.add(new JsonObject());

        // Create SockJS and bridge it to the Event Bus
        SockJSServer sockJSServer = vertx.createSockJSServer(server);
        sockJSServer.bridge(new JsonObject().putString("prefix", "/eventbus"),
                permitted, permitted);

        EventBus eb = vertx.eventBus();


        // Register Handler 1
        eb.registerLocalHandler("test.app",
                new Handler<Message>() {

                    @Override
                    public void handle(Message message) {
                        System.out.println(("Handler 1 received: "
                                + message.body.toString()));
                    }

                });

        server.listen(3000);
        this.eventBus = eb;

    }


    public EventBus getEventBus() {
        return eventBus;
    }
}
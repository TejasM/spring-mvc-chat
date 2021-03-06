spring-mvc-chat: Asynchronous Chat Example using Spring 3.2
======================================================
Author: Rossen Stoyanchev (Tejas Mehta)
Level: Intermediate
Technologies: Spring MVC, Thymeleaf, and Spring Redis
Summary: Demonstrates the use of JPA 2.0 and JSP in JBoss Enterprise Application Platform 6 or JBoss AS 7.
Target Product: EAP
Source: <https://github.com/jboss-jdf/jboss-as-quickstart/>

What is this?
-------------

The application this project produces is designed to be run on JBoss Enterprise Application Platform 6 or JBoss AS 7.

A chat sample using Spring MVC 3.2, Servlet-based, async request processing.

The servlet is configured for async support using: `<async-supported>true</async-supported>` in web.xml.

For template rendering, thymeleaf is used. This application also showcases the SPA (Single Page Application) model. This done using knockout.js for declarative bindings.
The corresponding is defined in `src/webapp/resources/js/chat.js`. The knockout observable chatContent is long polled by the pollForMessages(), which does long HTTP GET request.

In the `ChatController.java` the GET method for "/mvc/chat" mapping, creates a DeferredResult that is stored and activated later whenever a message is posted as a HTTP Post to "/mvc/chat".

System requirements
-------------------

All you need to build this project is Java 6.0 (Java SDK 1.6) or better, Maven 3.0 or better.

The application this project produces is designed to be run on JBoss Enterprise Application Platform 6 or JBoss AS 7.

Configure Maven
---------------

If you have not yet done so, you must Configure Maven before testing the quickstarts.

Start JBoss Enterprise Application Platform 6 or JBoss AS 7 with the Web Profile
---------------

1. Open a command line and navigate to the root of the JBoss server directory.
2. The following shows the command line to start the server with the web profile:

        For Linux:   JBOSS_HOME/bin/standalone.sh
        For Windows: JBOSS_HOME\bin\standalone.bat

Build and Deploy the Quickstart
----------------------------

_NOTE: The following build command assumes you have configured your Maven user settings. If you have not, you must include Maven setting arguments on the command line. See [Build and Deploy the Quickstarts](../README.md#buildanddeploy) for complete instructions and additional options._

1. Make sure you have started the JBoss Server as described above.
2. Open a command line and navigate to the root directory of this quickstart.
3. Type this command to build and deploy the archive:
        mvn clean package jboss-as:deploy

4. This will deploy target/spring-mvc-chat.war to the running instance of the server.

If you don't have maven configured you can manually copy target/spring-mvc-chat.war to JBOSS_HOME/standalone/deployments.

Access the application
----------------------

The application will be running at the following URL: <http://localhost:8080/jboss-as-spring-mvc-chat>

Undeploy the Archive
---------------------

1. Make sure you have started the JBoss Server as described above.
2. Open a command line and navigate to the root directory of this quickstart.
3. When you are finished testing, type this command to undeploy the archive:

        mvn jboss-as:undeploy

Or you can manually remove the application by removing spring-mvc-chat.war from JBOSS_HOME/standalone/deployments

Run the Quickstart in JBoss Developer Studio or Eclipse
-------------------------------------------------------

You can also start the server and deploy the quickstarts from Eclipse using JBoss tools. For more information, see [Use JBoss Developer Studio or Eclipse to Run the Quickstarts](../README.md#useeclipse)

Debug the Application
------------------------------------

If you want to debug the source code or look at the Javadocs of any library in the project, run either of the following commands to pull them into your local repository. The IDE should then detect them.

        mvn dependency:sources
        mvn dependency:resolve -Dclassifier=javadoc

### Overview

A chat sample using Spring MVC 3.2, Servlet-based, async request processing. Also see the [redis](https://github.com/rstoyanchev/spring-mvc-chat/tree/redis) branch for a distributed chat. 

### Note

There is a bug in Tomcat that affects this sample. Please, use Tomcat 7.0.32 or higher.

### Instructions

Eclipse users run `mvn eclipse:eclipse` and then import the project. Or just import the code as a Maven project into IntelliJ, NetBeans, or Eclipse.


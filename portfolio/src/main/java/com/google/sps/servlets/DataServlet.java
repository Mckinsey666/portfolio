// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;
import com.google.gson.Gson;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;


/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  private List<String> urls;
  //private List<String> comments;

  @Override 
  public void init() {
	  this.urls = new ArrayList<>();
	  //this.comments = new ArrayList<>();
	  this.urls.add("https://www.youtube.com/embed/XpqqjU7u5Yc");
	  this.urls.add("https://www.youtube.com/embed/WPi7LrQ1rNg");
	  this.urls.add("https://www.youtube.com/embed/EqPtz5qN7HM");
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Map<String, String> musicData = getRandomMusicData();
    String json = convertMusicDataToJson(musicData);
	response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String comment = request.getParameter("comment");
	long timestamp = System.currentTimeMillis();

	Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("content", comment);
    commentEntity.setProperty("timestamp", timestamp);
	DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);

	response.sendRedirect("blog/index.html");
  }

  private Map<String, String> getRandomMusicData() {
    int idx = (int)(Math.random() * this.urls.size());
    String url = this.urls.get(idx);
    Map<String, String> musicData = new HashMap<String, String>();
    musicData.put("id", String.valueOf(idx));
    musicData.put("url", url);
    return musicData;
  }

  private String convertMusicDataToJson(Map<String, String>data) {
    Gson gson = new Gson();
    String json = gson.toJson(data);
    return json;
  }
}

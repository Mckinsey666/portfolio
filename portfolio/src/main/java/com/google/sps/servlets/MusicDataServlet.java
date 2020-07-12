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
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;

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
@WebServlet("/random-music-data")
public class MusicDataServlet extends HttpServlet {

  private List<String> urls;
  //private List<String> comments;
  private class MusicMeta {
      private String url;
      private String musicId;
      private List<Map<String, String> > comments;
      
      public MusicMeta(String url, String musicId, List<Map<String, String> >comments){
          this.url = url;
          this.musicId = musicId;
          this.comments = comments;
      }
   }

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
    MusicMeta musicData = getRandomMusicData();
    String json = convertMusicMetaToJson(musicData);
    System.out.println(json);
	response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  private MusicMeta getRandomMusicData() {
    int idx = (int)(Math.random() * this.urls.size());
    String url = this.urls.get(idx);
    List<Map<String, String> > comments = getCommentsByMusicId(idx);
    MusicMeta musicData = new MusicMeta(url, String.valueOf(idx), comments);
    return musicData;
  }
  
  private List<Map<String, String> > getCommentsByMusicId(int musicId) {
    Filter propertyFilter = new FilterPredicate("musicId", FilterOperator.EQUAL, String.valueOf(musicId));
    Query q = new Query("Comment").setFilter(propertyFilter).addSort("timestamp", SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery pq = datastore.prepare(q);

    List<Map<String, String> > comments = new ArrayList<>();
    for (Entity result : pq.asIterable()) {
        String content = (String)result.getProperty("content");
        String id = (String)result.getProperty("musicId");
        Long timestamp = (Long)result.getProperty("timestamp");

        System.out.println(id + " " + timestamp + " " + content);
        Map<String, String> commentsData = new HashMap<String, String>();
        commentsData.put("content", content);
        commentsData.put("timestamp", String.valueOf(timestamp));
        comments.add(commentsData);
    }
    return comments;
  }

  private String convertMusicMetaToJson(MusicMeta data) {
    Gson gson = new Gson();
    String json = gson.toJson(data);
    return json;
  }
}

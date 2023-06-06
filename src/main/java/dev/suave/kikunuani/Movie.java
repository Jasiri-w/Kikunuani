package dev.suave.kikunuani;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "movies")
public class Movie {
    private Integer id;
    private String imdbId;
}

package mock.auction.service;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import com.google.gson.reflect.TypeToken;
import com.nimbusds.jose.shaded.gson.Gson;

import mock.auction.model.Holiday;

@Service
public class PublicHolidayChecker {
    private static final Logger logger = Logger.getLogger(PublicHolidayChecker.class.getName());

    public boolean isPublicHoliday(String counties) throws Exception {
        LocalDate today = LocalDate.now();
        // LocalDate today = LocalDate.of(2024, 03, 29);
        int yearOfToday = today.getYear();
        String apiUrl = "https://date.nager.at/api/v3/PublicHolidays/" + yearOfToday + "/us";

        try {
            String jsonResponse = sendHttpRequest(apiUrl);
            Map<String, Holiday> holidaysMap = parseJsonResponse(jsonResponse);

            return checkIfTodayIsHoliday(today, counties, holidaysMap);
        } catch (IOException | InterruptedException e) {
            logger.severe("Error while checking public holidays: " + e.getMessage());
            return false;
        }
    }

    private String sendHttpRequest(String apiUrl) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    private Map<String, Holiday> parseJsonResponse(String json) {
        Type listType = new TypeToken<List<Holiday>>() {
        }.getType();
        List<Holiday> holidays = new Gson().fromJson(json, listType);

        Map<String, Holiday> holidaysMap = new HashMap<>();
        for (Holiday holiday : holidays) {
            holidaysMap.put(holiday.getDate(), holiday);
        }

        return holidaysMap;
    }

    private boolean checkIfTodayIsHoliday(LocalDate today, String counties, Map<String, Holiday> holidaysMap)
            throws Exception {
        String formattedDate = today.toString();

        if (holidaysMap.containsKey(formattedDate)) {
            Holiday holiday = holidaysMap.get(formattedDate);
            if (counties != null && !counties.isEmpty()) {
                for (String county : holiday.getCounties()) {
                    if (county.equals(counties)) {
                        if (today.equals(LocalDate.parse(holiday.getDate()))) {
                            throw new Exception(
                                    "Today (" + formattedDate + ") is a public holiday in the US: "
                                            + holiday.getLocalName());
                        }
                    }
                }
            } else {
                if (today.equals(LocalDate.parse(holiday.getDate()))) {
                    throw new Exception(
                            "Today (" + formattedDate + ") is a public holiday in the US: "
                                    + holiday.getLocalName());
                }
            }
        }
        return true;
    }

}

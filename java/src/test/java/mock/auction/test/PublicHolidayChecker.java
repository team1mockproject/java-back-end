package mock.auction.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.URL;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.google.gson.reflect.TypeToken;
import com.nimbusds.jose.shaded.gson.Gson;

public class PublicHolidayChecker {

    public static void main(String[] args) {
        try {
            LocalDate today = LocalDate.of(2024, 11, 11);
            int yearOfToday = today.getYear();
            String apiUrl = "https://date.nager.at/api/v3/PublicHolidays/" + yearOfToday + "/us";

            // Send HTTP request and read response
            URL url = new URL(apiUrl);
            BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
            StringBuilder responseBuilder = new StringBuilder();
            String inputLine;

            while ((inputLine = reader.readLine()) != null) {
                responseBuilder.append(inputLine);
            }

            reader.close();

            // Parse JSON response
            String jsonResponse = responseBuilder.toString();
            Map<String, Holiday> holidaysMap = parseJsonResponse(jsonResponse);

            // Check if today is a public holiday
            String formattedDate = today.toString();
            if (holidaysMap.containsKey(formattedDate)) {
                Holiday holiday = holidaysMap.get(formattedDate);
                System.out.println(
                        "Today (" + formattedDate + ") is a public holiday in the US: " + holiday.getLocalName());
            } else {
                System.out.println("Today (" + formattedDate + ") is not a public holiday in the US.");
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static Map<String, Holiday> parseJsonResponse(String json) {
        Type listType = new TypeToken<List<Holiday>>() {
        }.getType();
        List<Holiday> holidays = new Gson().fromJson(json, listType);

        Map<String, Holiday> holidaysMap = new HashMap<>();
        for (Holiday holiday : holidays) {
            holidaysMap.put(holiday.getDate(), holiday);
        }

        return holidaysMap;
    }
}

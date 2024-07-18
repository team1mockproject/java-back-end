package mock.auction.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.URL;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.google.gson.reflect.TypeToken;
import com.nimbusds.jose.shaded.gson.Gson;

import mock.auction.model.Holiday;

@Service
public class PublicHolidayChecker {

    public boolean isPublicHoliday(String counties) throws Exception {
        try {
            LocalDate today = LocalDate.now();
            // LocalDate today = LocalDate.of(2024, 11, 11);
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
            System.out.println(formattedDate);
            if (holidaysMap.containsKey(formattedDate)) {
                Holiday holiday = holidaysMap.get(formattedDate);
                String[] holidayCounties = holiday.getCounties();
                for (String county : holidayCounties) {
                    if (county.equals(counties)) {
                        // return false;
                        throw new Exception(
                                "Today (" + formattedDate + ") is a public holiday in the US: "
                                        + holiday.getLocalName());
                    }
                }
            }
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
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

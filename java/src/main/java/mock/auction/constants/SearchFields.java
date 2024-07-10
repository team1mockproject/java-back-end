package mock.auction.constants;

import java.util.Map;

public interface SearchFields {
     Map<String, String> ACCOUNT_FIELD_TYPES = Map.of(
             "id", "number",
            "fullName", "string",
            "email", "string",
            "age", "number"
    );
}

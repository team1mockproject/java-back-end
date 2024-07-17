package mock.auction.model;

import lombok.Data;

@Data
public class Holiday {
    private String date;
    private String localName;
    private String[] counties;
}

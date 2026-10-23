package learning.web;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LearningWebApplicationTest {
    @Autowired
    private TestRestTemplate http;

    @Test
    void serverStartsWithoutBusinessEndpoints() {
        assertEquals(HttpStatus.NOT_FOUND,
                http.getForEntity("/not-configured", String.class).getStatusCode());
    }
}

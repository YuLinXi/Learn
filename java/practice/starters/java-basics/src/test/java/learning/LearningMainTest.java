package learning;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

class LearningMainTest {
    @Test
    void entryPointCanRun() {
        assertDoesNotThrow(() -> LearningMain.main(new String[0]));
    }
}

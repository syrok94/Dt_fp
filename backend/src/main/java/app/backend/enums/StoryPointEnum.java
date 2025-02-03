package app.backend.enums;

public enum StoryPointEnum {
	ONE(1),
	TWO(2),
	THREE(3),
	FIVE(5),
	TEN(10);
	
	private int value;
	
	private StoryPointEnum(int value) {
		this.value = value;
	}
	
	public int value() {
		return this.value;
	}
}

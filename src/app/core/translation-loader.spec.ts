import { CustomTranslationLoader } from "src/app/core/translation-loaoder";

describe('CustomTranslationLoader', () => {
  let loader: CustomTranslationLoader;

  beforeEach(() => {
    loader = new CustomTranslationLoader();
  });

  describe('constructor', () => {
    it('should set the languages map', () => {
      expect(loader.languages).toBeTruthy();
    });
  });
});

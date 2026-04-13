import { afterEach, describe, expect, it } from "vitest";
import { getSiteOrigin } from "./site";

const original = { ...process.env };

afterEach(() => {
  process.env = { ...original };
});

describe("getSiteOrigin", () => {
  it("trims trailing slashes from NEXT_PUBLIC_SITE_URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://air-miso.vercel.app/";
    delete process.env.VERCEL_URL;
    expect(getSiteOrigin()).toBe("https://air-miso.vercel.app");
  });

  it("falls back to https://VERCEL_URL when SITE_URL unset", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.VERCEL_URL = "preview-abc.vercel.app";
    expect(getSiteOrigin()).toBe("https://preview-abc.vercel.app");
  });

  it("uses localhost when no env", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_URL;
    expect(getSiteOrigin()).toBe("http://localhost:3000");
  });
});

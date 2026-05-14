import { expect } from "@open-wc/testing";
import { formatFileSize } from "../../src/utils/file";

describe("formatFileSize", () => {
  it("should format bytes less than 1 MB to KB", () => {
    const result = formatFileSize(500 * 1024); // 500 KB
    expect(result).to.include("KB");
    expect(result).to.include("500");
  });

  it("should format bytes between 1 MB and 1 GB to MB", () => {
    const result = formatFileSize(50 * 1024 * 1024); // 50 MB
    expect(result).to.include("MB");
    expect(result).to.include("50");
  });

  it("should format bytes between 1 GB and 1 TB to GB", () => {
    const result = formatFileSize(2 * 1024 * 1024 * 1024); // 2 GB
    expect(result).to.include("GB");
    expect(result).to.include("2");
  });

  it("should format bytes 1 TB or larger to TB", () => {
    const result = formatFileSize(1.5 * 1024 * 1024 * 1024 * 1024); // 1.5 TB
    expect(result).to.include("TB");
    expect(result).to.include("1.5");
  });

  it("should handle small files correctly", () => {
    const result = formatFileSize(100 * 1024); // 100 KB
    expect(result).to.equal("100.00 KB");
  });

  it("should handle edge case of exactly 1 MB", () => {
    const result = formatFileSize(1 * 1024 * 1024); // 1 MB
    expect(result).to.include("MB");
    expect(result).to.include("1");
  });

  it("should handle edge case of exactly 1 GB", () => {
    const result = formatFileSize(1 * 1024 * 1024 * 1024); // 1 GB
    expect(result).to.include("GB");
    expect(result).to.include("1");
  });

  it("should handle edge case of exactly 1 TB", () => {
    const result = formatFileSize(1 * 1024 * 1024 * 1024 * 1024); // 1 TB
    expect(result).to.include("TB");
    expect(result).to.include("1");
  });

  it("should handle very large files", () => {
    const result = formatFileSize(5 * 1024 * 1024 * 1024 * 1024); // 5 TB
    expect(result).to.include("TB");
    expect(result).to.include("5");
  });
});

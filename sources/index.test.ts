import { beforeWorkspacePacking } from ".";

describe("beforeWorkspacePacking", () => {
  test('does not modify keys not starting with "$"', () => {
    const rawManifest = {
      name: "Name",
      key1: "initial",
      key2: "initial key2",
      publishConfig: {
        key1: "modified",
        key2$: "modified",
      },
    };
    beforeWorkspacePacking(undefined, rawManifest);
    expect(rawManifest.name).toBe("Name");
    expect(rawManifest.key1).toBe("initial");
    expect(rawManifest.key2).toBe("initial key2");
  });
  test("replaces and adds primitives correctly", () => {
    const rawManifest = {
      name: "Name",
      key1: "initial",
      key2: "initial key2",
      publishConfig: {
        $key1: "modified",
        $key2: 3,
        $key3: null,
        $key4: true,
      },
    } as any;
    beforeWorkspacePacking(undefined, rawManifest);
    expect(rawManifest.key1).toBe("modified");
    expect(rawManifest.key2).toBe(3);
    expect(rawManifest.key3).toBe(null);
    expect(rawManifest.key4).toBe(true);
  });
  test("replaces objects correctly", () => {
    const rawManifest = {
      name: "Name",
      key1: "initial",
      key2: "initial key2",
      key3: {
        a: {
          a1: 3,
        },
      },
      key4: {
        a: {
          a1: 3,
        },
      },
      publishConfig: {
        $key1: {},
        $key2: { a: "A" },
        $key3: null,
        $key4: {
          a: {
            a1: 3,
            a2: 4,
          },
          b: {
            b1: 2,
          },
        },
        $key5: [1, 2, 3, 4],
      },
    } as any;
    beforeWorkspacePacking(undefined, rawManifest);
    expect(rawManifest.key1).toEqual({});
    expect(rawManifest.key2).toEqual({ a: "A" });
    expect(rawManifest.key3).toEqual(null);
    expect(rawManifest.key4).toEqual({
      a: {
        a1: 3,
        a2: 4,
      },
      b: {
        b1: 2,
      },
    });
    expect(rawManifest.key5).toEqual([1, 2, 3, 4]);
  });

  test("replaces objects correctly", () => {
    const rawManifest = {
      name: "Name",
      key1: "initial",
      key2: "initial key2",
      key3: {
        a: {
          a1: 3,
        },
      },
      key4: {
        a: {
          a1: 3,
        },
      },
      key5: [{ a: { a1: [{ a2: "value", a3: 10 }] }, b: 10, c: 20 }],
      publishConfig: {
        $key1: {},
        $key2: { a: "A" },
        "$key3.a.a1": 10,
        "$key4.a.b.c.d": {
          a: {
            a1: 3,
            a2: 4,
          },
          b: {
            b1: 2,
          },
        },
        "$key5.0.a.a1.0.a3": 1000,
      },
    } as any;
    beforeWorkspacePacking(undefined, rawManifest);
    expect(rawManifest.key1).toEqual({});
    expect(rawManifest.key2).toEqual({ a: "A" });
    expect(rawManifest.key3).toEqual({
      a: {
        a1: 10,
      },
    });
    expect(rawManifest.key4).toEqual({
      a: {
        a1: 3,
        b: {
          c: {
            d: {
              a: {
                a1: 3,
                a2: 4,
              },
              b: {
                b1: 2,
              },
            },
          },
        },
      },
    });
    expect(rawManifest.key5).toEqual([
      { a: { a1: [{ a2: "value", a3: 1000 }] }, b: 10, c: 20 },
    ]);
  });
});

import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LazyImage from "../lib";

configure({ adapter: new Adapter() });

const src = "SOURCE";
const placeholder = "PLACEHOLDER";

const mountProgressiveImage = renderFn => {
  const defaultRender = image => {
    return <img src={image} />;
  };
  const render = renderFn || defaultRender;
  return mount(
    <LazyImage src={src} placeholder={placeholder}>
      {render}
    </LazyImage>
  );
};

describe("react-lazy-progressive-image", () => {
  beforeEach(() => {
    global.Image = Image;
  });

  it("exports a React component", () => {
    expect(typeof LazyImage).toBe("function");
  });
  it("creates an instance of Image when mounted", () => {
    const wrapper = mountProgressiveImage();
    const instance = wrapper.instance();
    expect(instance.image.constructor).toBe(HTMLImageElement);
  });
  it.skip("throws if function is not sent as child", () => {
    expect(mount(<LazyImage src={src} placeholder={placeholder} />)).toThrow();
  });
});

describe("react-lazy-progressive-image loads the right image", () => {
  beforeEach(() => {
    global.Image = Image;
  });

  it("renders placeholder first", () => {
    const renderMock = jest
      .fn()
      .mockImplementation(imgSrc => <img src={imgSrc} />);
    const wrapper = mountProgressiveImage(renderMock);
    const instance = wrapper.instance();
    expect(renderMock.mock.calls[0][0]).toEqual(placeholder);
  });

  it("renders src onLoad", () => {
    const renderMock = jest
      .fn()
      .mockImplementation(imgSrc => <img src={imgSrc} />);
    const wrapper = mountProgressiveImage(renderMock);
    wrapper.instance().loadImage(src);
    wrapper.instance().onLoad();
    //TODO: Visibility sensor currently calls an extra render because initially
    // isVisible starts of as null
    // https://github.com/joshwnj/react-visibility-sensor/blob/master/visibility-sensor.js#L82
    expect(renderMock.mock.calls[2][0]).toEqual(src);
  });
});

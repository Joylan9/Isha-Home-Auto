import { photos } from '../data/photos';
import { Img } from './Img';

export function Sovir() {
  return (
    <section className="sovir" id="sovir">
      <div className="sovir__media">
        <Img photo={photos.timberControls} alt="Precision-crafted control buttons set into dark timber" data-parallax="-10" />
      </div>
      <div className="sovir__veil" />
      <div className="container sovir__content">
        <p className="eyebrow" data-reveal>
          Engineered with SoVir Technologies LLP
        </p>
        <h2 className="title title--xl" data-split>
          Precision you can <em>trust</em>.
        </h2>
        <p className="sovir__text" data-reveal>
          ISHA is a proposed independent LLP brand, supported by SoVir Technologies LLP for technology development and innovation — bringing proven
          experience in automation and intelligent control systems into the home.
        </p>
        <div className="sovir__pillars" data-reveal>
          <div><b>Automation</b><span>Control-systems engineering</span></div>
          <div><b>Innovation</b><span>Technology development</span></div>
          <div><b>Support</b><span>On-ground, close to home</span></div>
        </div>
        <p className="sovir__fine" data-reveal>
          Products and capabilities shown are planned offerings, subject to development and validation.
        </p>
      </div>
    </section>
  );
}

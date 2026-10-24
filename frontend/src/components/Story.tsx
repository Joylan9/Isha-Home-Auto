import { photos } from '../data/photos';
import { Img } from './Img';

export function Story() {
  return (
    <section className="story section" id="story">
      <div className="container story__grid">
        <div className="story__head">
          <p className="eyebrow" data-reveal>
            The story behind ISHA
          </p>
          <h2 className="title" data-split>
            Born on the coast. <em>Designed</em> for the way we live.
          </h2>
        </div>
        <div className="story__body">
          <p className="story__big" data-words>
            Coastal Karnataka is changing. From family homes in Kundapura and Udupi to contemporary residences in Manipal and Mangaluru, people are
            creating spaces that balance tradition, comfort and modern aspirations.
          </p>
          <p className="muted" data-reveal>
            Yet the technology inside many homes remains scattered across switches, remotes and disconnected applications. At SoVir Technologies LLP,
            our work in automation and intelligent control systems inspired a simple question:{' '}
            <strong>what if the home itself could quietly take care of everyday routines?</strong>
          </p>
          <p className="muted" data-reveal>
            That idea became ISHA — an invisible, intelligent companion that helps your surroundings respond to you, instead of asking you to constantly
            manage them.
          </p>
        </div>
      </div>

      <div className="story__gallery container">
        <figure className="story__img story__img--a" data-clip>
          <Img
            photo={photos.coastalHome}
            sizes="(min-width: 900px) 60vw, 100vw"
            alt="A coastal home among trees with a pool and the sea beyond"
            data-parallax="-6"
          />
        </figure>
        <figure className="story__img story__img--b" data-clip>
          <Img photo={photos.oceanBedroom} sizes="(min-width: 900px) 34vw, 100vw" alt="A bedroom opening onto a balcony with a calm ocean view" data-parallax="6" />
        </figure>
        <div className="story__why glass" data-reveal>
          <p className="eyebrow">Why we are starting here</p>
          <p>
            Our roots are in Coastal Karnataka. We want to bring considered, premium smart-living experiences closer to local families, architects and
            homeowners — backed by accessible engineering expertise and dependable on-ground support.
          </p>
        </div>
      </div>
    </section>
  );
}

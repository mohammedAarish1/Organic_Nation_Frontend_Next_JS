import Image from "next/image";
import { FadeInView } from "../animations/animations";

const certificates = [
  "https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/usoca.png",
  "https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/fssi.webp",
  // 'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/haccp.webp',
  "https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/jaivik.webp",
  "https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/organic.webp",
  "https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/usda.webp",
];

const CertificatesSection = () => {
  return (
    <div className="bg-linear-to-b from-[#F5EFE6] via-white to-[#F5EFE6] px-4 py-4 sm:px-6 lg:px-10">
      <div className="max-w mx-auto">
        {/* Section header */}
        {/* <Title
          heading={title}
          subHeading="Our certifications represent our commitment to quality, safety, and excellence"
        /> */}

        {/* Certificates container */}

        <FadeInView>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
            {certificates.map((imgPath, index) => (
              <div key={imgPath}>
                <div className="rounded-lg p-3 transition-all duration-300 sm:p-4">
                  <Image
                    src={imgPath}
                    alt={`Certificate ${index + 1}`}
                    width={160}
                    height={160}
                    className="h-auto w-24 object-contain sm:w-32 lg:w-40"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </div>
  );
};

CertificatesSection.displayName = "CertificatesSection";

export default CertificatesSection;

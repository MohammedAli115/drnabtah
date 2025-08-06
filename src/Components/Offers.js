import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import SectionTitle from "./SectionTitle";

function Offers() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const isOffersPage = location.pathname === "/offers";

  return (
    <div className="offers container py-5 fs-4 mt-5">
      {isOffersPage && (
        <SectionTitle text={t("offers.title")} color="#60d8d2" />
      )}

      {/*  عرض heading فقط إذا لم تكن في صفحة /offers */}
      {!isOffersPage && (
        <div className="heading  mb-4">
          <h3 className="text-center text-info fw-bold">
            {i18n.language === "ar"
              ? "عروض حقيقية، لمسة تقدير لعنايتك"
              : "Real offers, a gesture of care for your trust."}
          </h3>
        </div>
      )}

      {/*  عرض المقدمة فقط داخل صفحة /offers */}
      {isOffersPage && (
        <div className="mb-4">
          <p className="lead">
            {i18n.language === "ar" ? (
              <>
                نُقدّر ثقتك، ونُكافئها بعروض حقيقية وشفافة.
                <br />• باقات علاجية بتوفير ذكي
                <br />• هدايا قيمة مع الطلبات
                <br />• خصومات موسمية على المنتجات الأكثر طلبًا
                <br />• عروض حصرية لمتابعاتنا على المنصات الاجتماعية
                <br />
                <br />
                📍تابعي قسم العروض أولاً بأول… فالعناية الفعّالة لا تحتاج أن
                تكون مُكلفة.
              </>
            ) : (
              <>
                We appreciate your trust and reward it with real and transparent
                offers.
                <br />• Smart-saving treatment packages
                <br />• Valuable gifts with orders
                <br />• Seasonal discounts on top-demanded products
                <br />• Exclusive offers for our social media followers
                <br />
                <br />
                📍Stay tuned to the offers section… Effective care doesn’t have
                to be expensive.
              </>
            )}
          </p>
        </div>
      )}

      {/* ✅ صور العروض */}
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Link to="/offers">
            <img
              src="/images/offers/offer1.png"
              style={{ width: "100%", height: "300px" }}
              alt="offers"
              className="my-3"
            />
          </Link>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Link to="/offers">
            <img
              src="/images/offers/offer2.png"
              style={{ width: "100%", height: "300px" }}
              alt="offers"
              className="my-3"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Offers;

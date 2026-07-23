import * as styles from '@/styles/application.css';
import * as pageStyles from '@/styles/page.css';

const ApplicationSkeleton = () => (
  <>
    <header className={pageStyles.header}>
      <span className={styles.applicationTitleSkeleton} aria-hidden />
    </header>
    <div className={styles.form} aria-hidden>
      <section className={styles.card}>
        <CardHeading />
        <span className={styles.applicationConsentSkeleton} />
      </section>

      <section className={styles.card}>
        <CardHeading />
        <div className={styles.fieldSections}>
          <div className={styles.fieldSection}>
            <span className={styles.applicationSectionTitleSkeleton} />
            <FieldSkeletons count={3} />
          </div>
          <div className={styles.fieldSection}>
            <span className={styles.applicationSectionTitleSkeleton} />
            <FieldSkeletons count={4} />
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <CardHeading />
        <FieldSkeletons count={2} />
      </section>

      <section className={styles.card}>
        <span className={styles.applicationCardTitleSkeleton} />
        <div className={styles.applicationConfirmationSkeletons}>
          <span className={styles.applicationConsentSkeleton} />
          <span className={styles.applicationConsentSkeleton} />
          <span className={styles.applicationConsentSkeleton} />
        </div>
        <span className={styles.applicationButtonSkeleton} />
      </section>
    </div>
  </>
);

const CardHeading = () => (
  <>
    <span className={styles.applicationCardTitleSkeleton} />
    <div className={styles.applicationTextSkeletons}>
      <span className={styles.applicationTextSkeleton} />
      <span className={styles.applicationShortTextSkeleton} />
    </div>
  </>
);

const FieldSkeletons = ({ count }: { count: number }) => (
  <div className={styles.fieldGrid}>
    {Array.from({ length: count }, (_, index) => (
      <span className={styles.applicationFieldSkeleton} key={index} />
    ))}
  </div>
);

export default ApplicationSkeleton;

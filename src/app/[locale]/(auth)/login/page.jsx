import React from "react";
import { useTranslations } from "next-intl";
import AcountTypeSelect from "@/components/AcountTypeSelect";

export default function Page() {
  const t = useTranslations("accountType.login");
	return (
		<>
			<AcountTypeSelect description={t("description")} linktitle={t("donthaveAccount")} title={t("title")} linktype={t("signup")} link="/register" />
		</>
	);
}

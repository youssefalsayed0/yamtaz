
import React from "react";
import AcountTypeSelect from "@/components/AcountTypeSelect";
import { useTranslations } from "next-intl";

export default function Page() {

 const t = useTranslations("accountType.signup");
	return <AcountTypeSelect description={t("description")} linktitle={t("haveAccount")} title={t("title")} linktype={t("login")} link="/login" />
}

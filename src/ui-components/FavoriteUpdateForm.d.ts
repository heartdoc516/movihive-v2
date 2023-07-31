/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Favorite } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FavoriteUpdateFormInputValues = {
    tmdbId?: number;
};
export declare type FavoriteUpdateFormValidationValues = {
    tmdbId?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FavoriteUpdateFormOverridesProps = {
    FavoriteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tmdbId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FavoriteUpdateFormProps = React.PropsWithChildren<{
    overrides?: FavoriteUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    favorite?: Favorite;
    onSubmit?: (fields: FavoriteUpdateFormInputValues) => FavoriteUpdateFormInputValues;
    onSuccess?: (fields: FavoriteUpdateFormInputValues) => void;
    onError?: (fields: FavoriteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FavoriteUpdateFormInputValues) => FavoriteUpdateFormInputValues;
    onValidate?: FavoriteUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FavoriteUpdateForm(props: FavoriteUpdateFormProps): React.ReactElement;

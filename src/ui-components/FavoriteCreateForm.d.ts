/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FavoriteCreateFormInputValues = {
    tmdbId?: number;
};
export declare type FavoriteCreateFormValidationValues = {
    tmdbId?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FavoriteCreateFormOverridesProps = {
    FavoriteCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tmdbId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FavoriteCreateFormProps = React.PropsWithChildren<{
    overrides?: FavoriteCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FavoriteCreateFormInputValues) => FavoriteCreateFormInputValues;
    onSuccess?: (fields: FavoriteCreateFormInputValues) => void;
    onError?: (fields: FavoriteCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FavoriteCreateFormInputValues) => FavoriteCreateFormInputValues;
    onValidate?: FavoriteCreateFormValidationValues;
} & React.CSSProperties>;
export default function FavoriteCreateForm(props: FavoriteCreateFormProps): React.ReactElement;

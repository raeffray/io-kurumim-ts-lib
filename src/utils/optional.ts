export class Optional<T> {
    private value: T | null | undefined;

    private constructor(value: T | null | undefined) {
        this.value = value;
    }

    static ofNullable<T>(value: T | null | undefined): Optional<T> {
        return new Optional(value);
    }

    map<U>(mapper: (value: NonNullable<T>) => U | null | undefined): Optional<U> {
        if (this.value === null || this.value === undefined) {
            return Optional.ofNullable<U>(null);
        }
        const newValue = mapper(this.value as NonNullable<T>);
        return Optional.ofNullable<U>(newValue === undefined ? null : newValue);
    }

    filter(predicate: (value: NonNullable<T>) => boolean): Optional<T> {
        if (this.value === null || this.value === undefined || !predicate(this.value as NonNullable<T>)) {
            return Optional.ofNullable<T>(null);
        }
        return this;
    }

    orElse(defaultValue: (() => NonNullable<T>) | NonNullable<T>): NonNullable<T> {
        if (this.value !== null && this.value !== undefined) {
            return this.value as NonNullable<T>;
        }
        return typeof defaultValue === "function" ? (defaultValue as () => NonNullable<T>)() : defaultValue;
    }

    orElseThrow<E extends Error>(exceptionSupplier: (() => E)): NonNullable<T> {
        if (this.value !== null && this.value !== undefined) {
            return this.value as NonNullable<T>;
        }
        throw exceptionSupplier();
    }

    ifPresent(consumer: (value: NonNullable<T>) => void): void {
        if (this.value !== null && this.value !== undefined) {
            consumer(this.value as NonNullable<T>);
        }
    }

    get(): NonNullable<T> {
        if (this.value === null || this.value === undefined) {
            throw new Error('No value present');
        }
        return this.value as NonNullable<T>;
    }

    isPresent(): boolean {
        return this.value !== null && this.value !== undefined;
    }
}

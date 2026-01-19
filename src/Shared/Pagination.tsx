import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../Contexts/ThemeContext';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const { colors } = useTheme();

    if (totalPages <= 1) return null;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, currentPage === 1 && styles.disabledButton]}
                onPress={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft size={20} color={currentPage === 1 ? colors.subText : colors.primary} />
            </TouchableOpacity>

            <View style={styles.pageInfo}>
                <Text style={[styles.pageText, { color: colors.text }]}>
                    {currentPage} <Text style={{ color: colors.subText }}>/</Text> {totalPages}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.button, currentPage === totalPages && styles.disabledButton]}
                onPress={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight size={20} color={currentPage === totalPages ? colors.subText : colors.primary} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        gap: 16,
    },
    button: {
        padding: 10,
        borderRadius: 12,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(212, 160, 23, 0.2)', // Primary gold with low opacity
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        borderColor: 'rgba(0,0,0,0.05)',
    },
    pageInfo: {
        minWidth: 60,
        alignItems: 'center',
    },
    pageText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Pagination;
